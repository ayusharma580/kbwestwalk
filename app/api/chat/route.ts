import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { getOpenAIClient, CHAT_MODEL } from "@/app/lib/openai";
import { buildSystemPrompt } from "@/app/lib/chatbot/knowledge";
import { checkRateLimit,  getClientIp } from "@/app/lib/rateLimiter";
import type { ChatRole } from "@/app/types/chat";

const MAX_MESSAGES_TO_MODEL = 20;
const CHAT_RATE_LIMIT = 30; // requests
const CHAT_RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

type ChatRequestBody = {
  sessionToken?: unknown;
  pageUrl?: unknown;
  messages?: unknown;
};

function isValidRole(role: unknown): role is ChatRole {
  return role === "user" || role === "assistant";
}

function sanitizeMessages(
  raw: unknown
): { role: ChatRole; content: string }[] {
  if (!Array.isArray(raw)) return [];

  const cleaned: { role: ChatRole; content: string }[] = [];

  for (const item of raw as IncomingMessage[]) {
    if (
      item &&
      isValidRole(item.role) &&
      typeof item.content === "string" &&
      item.content.trim().length > 0
    ) {
      cleaned.push({ role: item.role, content: item.content.trim().slice(0, 4000) });
    }
  }

  return cleaned.slice(-MAX_MESSAGES_TO_MODEL);
}

export async function POST(request: Request) {
  try {
    // ---- 1. Rate limit ----
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`chat:${ip}`, CHAT_RATE_LIMIT, CHAT_RATE_WINDOW_MS);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "You're sending messages too quickly. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    // ---- 2. Parse & validate body ----
    let body: ChatRequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Chat request JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const sessionToken =
      typeof body.sessionToken === "string" && body.sessionToken.trim()
        ? body.sessionToken.trim()
        : null;
    const pageUrl =
      typeof body.pageUrl === "string" ? body.pageUrl.trim().slice(0, 500) : null;
    const messages = sanitizeMessages(body.messages);

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Missing sessionToken." },
        { status: 400 }
      );
    }

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return NextResponse.json(
        { success: false, message: "A user message is required." },
        { status: 400 }
      );
    }

    const latestUserMessage = messages[messages.length - 1].content;

    // ---- 3. Ensure Supabase + OpenAI are configured ----
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (configError) {
      console.error("Supabase configuration error:", configError);
      return NextResponse.json(
        {
          success: false,
          message:
            configError instanceof Error
              ? configError.message
              : "Supabase is not configured correctly.",
        },
        { status: 500 }
      );
    }

    let openai;
    try {
      openai = getOpenAIClient();
    } catch (configError) {
      console.error("OpenAI configuration error:", configError);
      return NextResponse.json(
        {
          success: false,
          message:
            configError instanceof Error
              ? configError.message
              : "The AI consultant is not configured correctly.",
        },
        { status: 500 }
      );
    }

    // ---- 4. Upsert the chat session (create on first message, else just touch it) ----
    const userAgent = request.headers.get("user-agent") ?? null;
    let sessionId: string | null = null;

    try {
      const { data: existingSession } = await supabaseAdmin
        .from("chat_sessions")
        .select("id")
        .eq("session_token", sessionToken)
        .maybeSingle();

      if (existingSession?.id) {
        sessionId = existingSession.id as string;
        await supabaseAdmin
          .from("chat_sessions")
          .update({ updated_at: new Date().toISOString(), page_url: pageUrl })
          .eq("id", sessionId);
      } else {
        const { data: newSession, error: insertSessionError } = await supabaseAdmin
          .from("chat_sessions")
          .insert([
            {
              session_token: sessionToken,
              page_url: pageUrl,
              ip_address: ip,
              user_agent: userAgent,
            },
          ])
          .select("id")
          .single();

        if (insertSessionError) throw insertSessionError;
        sessionId = newSession?.id as string;
      }
    } catch (sessionError) {
      // Non-fatal: the chatbot can still respond even if session tracking fails.
      console.error("Failed to upsert chat_sessions row:", sessionError);
    }

    // ---- 5. Save the incoming user message ----
    if (sessionId) {
      try {
        await supabaseAdmin.from("chat_messages").insert([
          {
            session_id: sessionId,
            role: "user",
            content: latestUserMessage,
          },
        ]);
      } catch (msgError) {
        console.error("Failed to save user chat message:", msgError);
      }
    }

    // ---- 6. Stream the AI response ----
    const openAiMessages = [
      { role: "system" as const, content: buildSystemPrompt() },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const encoder = new TextEncoder();
    const currentSessionId = sessionId;

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let fullText = "";

        try {
          const completion = await openai.chat.completions.create({
            model: CHAT_MODEL,
            messages: openAiMessages,
            stream: true,
            temperature: 0.4,
            max_tokens: 500,
          });

          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta?.content ?? "";
            if (delta) {
              fullText += delta;
              controller.enqueue(encoder.encode(delta));
            }
          }
        } catch (streamError) {
          console.error("OpenAI streaming error:", streamError);
          const fallback =
            "I'm sorry, I ran into an issue just now. Please try again, or call our sales team directly at +91 8587870099.";
          controller.enqueue(encoder.encode(fallback));
          fullText = fallback;
        } finally {
          controller.close();

          if (currentSessionId && fullText) {
            try {
              await supabaseAdmin.from("chat_messages").insert([
                {
                  session_id: currentSessionId,
                  role: "assistant",
                  content: fullText,
                },
              ]);
            } catch (dbError) {
              console.error("Failed to save assistant chat message:", dbError);
            }
          }
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Unhandled /api/chat error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}