import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendChatLeadNotificationEmail } from "@/app/lib/resend";
import { checkRateLimit, getClientIp } from "@/app/lib/rateLimiter";

const LEAD_RATE_LIMIT = 10; // requests
const LEAD_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

type ChatLeadRequestBody = {
  sessionToken?: unknown;
  pageUrl?: unknown;
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  budget?: unknown;
  interestedUnit?: unknown;
  preferredTime?: unknown;
  conversationSummary?: unknown;
};

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableString(value: unknown): string | null {
  const str = toTrimmedString(value);
  return str.length > 0 ? str : null;
}

export async function POST(request: Request) {
  try {
    // ---- 1. Rate limit ----
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`chat-lead:${ip}`, LEAD_RATE_LIMIT, LEAD_RATE_WINDOW_MS);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
        },
        { status: 429 }
      );
    }

    // ---- 2. Parse & validate body ----
    let body: ChatLeadRequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Chat lead JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const sessionToken = toNullableString(body.sessionToken);
    const pageUrl = toNullableString(body.pageUrl);
    const fullName = toTrimmedString(body.fullName);
    const phone = toTrimmedString(body.phone);
    const email = toTrimmedString(body.email);
    const budget = toNullableString(body.budget);
    const interestedUnit = toNullableString(body.interestedUnit);
    const preferredTime = toNullableString(body.preferredTime);
    const conversationSummary = toNullableString(body.conversationSummary);

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ---- 3. Get Supabase client ----
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

    // ---- 4. Resolve session_id (if the session row exists) ----
    let sessionId: string | null = null;
    if (sessionToken) {
      try {
        const { data: existingSession } = await supabaseAdmin
          .from("chat_sessions")
          .select("id")
          .eq("session_token", sessionToken)
          .maybeSingle();

        if (existingSession?.id) {
          sessionId = existingSession.id as string;
        }
      } catch (lookupError) {
        console.error("Failed to look up chat session for lead:", lookupError);
      }
    }

    const userAgent = request.headers.get("user-agent") ?? null;

    // ---- 5. Insert the lead ----
    const { error } = await supabaseAdmin.from("chat_leads").insert([
      {
        session_id: sessionId,
        full_name: fullName,
        phone,
        email,
        budget,
        interested_unit: interestedUnit,
        preferred_time: preferredTime,
        conversation_summary: conversationSummary,
        page_url: pageUrl,
        ip_address: ip,
        user_agent: userAgent,
      },
    ]);

    if (error) {
      console.error("Supabase chat_leads insert error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    // ---- 6. Send the admin notification email (never fails the API) ----
    try {
      const emailResult = await sendChatLeadNotificationEmail({
        fullName,
        phone,
        email,
        budget,
        interestedUnit,
        preferredTime,
        conversationSummary,
        pageUrl,
        submittedAt: new Date(),
      });

      if (!emailResult.success) {
        console.error("Chat lead saved, but notification email failed:", emailResult.error);
      }
    } catch (emailError) {
      console.error(
        "Chat lead saved, but notification email threw an unexpected error:",
        emailError
      );
    }

    // ---- 7. Success (lead is saved regardless of email outcome) ----
    return NextResponse.json(
      { success: true, message: "Thank you! Our team will get in touch shortly." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unhandled /api/chat/lead error:", error);
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