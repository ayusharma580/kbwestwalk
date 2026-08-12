"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/app/hooks/uselocalstorage";
import { detectBuyingIntent } from "@/app/lib/chatbot/leaddetection";
import type { ChatMessage, LeadFormData } from "@/app/types/chat";

const WELCOME_MESSAGE = `Welcome to KB West Walk. I'm your AI Property Consultant.

I can help you with:
- Retail Shops
- Food Court
- Studio Apartments
- Investment Opportunities
- Pricing
- Floor Plans
- Payment Plans
- Booking Process
- Location
- ROI
- Amenities
- Offers
- Site Visit Booking

What would you like to know?`;

const LEAD_FORM_PROMPT =
  "I'd love to get our sales team to help you further. Could you share a few details so they can reach out?";

const MAX_STORED_MESSAGES = 50;
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918587870099";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function playNotificationBeep() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.25);

    oscillator.onended = () => {
      ctx.close().catch(() => undefined);
    };
  } catch {
    // Audio is a nice-to-have; never let it break the chat experience.
  }
}

function buildConversationSummary(messages: ChatMessage[]): string {
  return messages
    .filter((m) => m.kind === "text")
    .slice(-14)
    .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
    .join("\n");
}

type ChatContextValue = {
  messages: ChatMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  unreadCount: number;
  leadCaptured: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  submitLead: (data: LeadFormData) => Promise<{ success: boolean; message: string }>;
  buildWhatsAppLink: () => string;
};

const ChatContext = createContext<ChatContextValue | null>(null);

function createWelcomeMessage(): ChatMessage {
  return {
    id: generateId(),
    role: "assistant",
    kind: "text",
    content: WELCOME_MESSAGE,
    createdAt: new Date().toISOString(),
  };
}

export function ChatProvider({ children }: { children: ReactNode }) {
  // This provider tree is only ever mounted client-side in practice (the
  // Chatbot widget that reads this context is loaded via a ssr:false
  // dynamic import), so it's safe to resolve these from localStorage with
  // a lazy useState initializer rather than an effect — there's no
  // server-rendered DOM derived from this state to mismatch against.
  const [resolvedToken] = useState<string>(() => {
    if (typeof window === "undefined") return "";

    try {
      const stored = window.localStorage.getItem("kbww_chat_session_token");
      if (stored) return JSON.parse(stored) as string;
    } catch {
      // fall through and mint a new token
    }

    const newToken = generateId();
    try {
      window.localStorage.setItem(
        "kbww_chat_session_token",
        JSON.stringify(newToken)
      );
    } catch {
      // ignore write failures (e.g. storage disabled)
    }
    return newToken;
  });

  // Default value already includes the welcome message — it's only used
  // the very first time (no stored history yet), so no effect is needed
  // to "show" it after the fact.
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    "kbww_chat_messages",
    [createWelcomeMessage()]
  );
  const [leadCaptured, setLeadCaptured] = useLocalStorage<boolean>(
    "kbww_chat_lead_captured",
    false
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const leadFormShownRef = useRef(
    messages.some((m) => m.kind === "lead-form")
  );

  useEffect(() => {
    leadFormShownRef.current = messages.some((m) => m.kind === "lead-form");
  }, [messages]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setUnreadCount(0);
      return next;
    });
    setIsMinimized(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const maximizeChat = useCallback(() => {
    setIsMinimized(false);
    setUnreadCount(0);
  }, []);

  const appendMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((prev) => [...prev, message].slice(-MAX_STORED_MESSAGES));
    },
    [setMessages]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        kind: "text",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      const historyForApi = [
        ...messages
          .filter((m) => m.kind === "text")
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: trimmed },
      ].slice(-20);

      appendMessage(userMessage);
      setIsTyping(true);

      const hasIntent = detectBuyingIntent(trimmed);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionToken: resolvedToken,
            pageUrl: typeof window !== "undefined" ? window.location.pathname : "",
            messages: historyForApi,
          }),
        });

        const contentType = response.headers.get("content-type") || "";

        if (!response.ok || contentType.includes("application/json")) {
          let errorMessage = "Something went wrong. Please try again.";
          try {
            const errorJson = await response.json();
            errorMessage = errorJson?.message || errorMessage;
          } catch {
            // ignore parse failure, keep default message
          }

          appendMessage({
            id: generateId(),
            role: "assistant",
            kind: "error",
            content: errorMessage,
            createdAt: new Date().toISOString(),
          });
          setIsTyping(false);
          return;
        }

        const assistantMessageId = generateId();
        appendMessage({
          id: assistantMessageId,
          role: "assistant",
          kind: "text",
          content: "",
          createdAt: new Date().toISOString(),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            accumulated += decoder.decode(value, { stream: true });

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId ? { ...m, content: accumulated } : m
              )
            );
          }
        }

        setIsTyping(false);

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
          playNotificationBeep();
        }

        if (hasIntent && !leadCaptured && !leadFormShownRef.current) {
          leadFormShownRef.current = true;
          appendMessage({
            id: generateId(),
            role: "assistant",
            kind: "lead-form",
            content: LEAD_FORM_PROMPT,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("sendMessage failed:", error);
        appendMessage({
          id: generateId(),
          role: "assistant",
          kind: "error",
          content:
            "I couldn't reach our servers just now. Please check your connection and try again.",
          createdAt: new Date().toISOString(),
        });
        setIsTyping(false);
      }
    },
    [appendMessage, isOpen, isTyping, leadCaptured, messages, resolvedToken, setMessages]
  );

  const submitLead = useCallback(
    async (data: LeadFormData): Promise<{ success: boolean; message: string }> => {
      try {
        const response = await fetch("/api/chat/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            sessionToken: resolvedToken,
            pageUrl: typeof window !== "undefined" ? window.location.pathname : "",
            conversationSummary: buildConversationSummary(messages),
          }),
        });

        const text = await response.text();
        const result = text ? JSON.parse(text) : null;

        if (!response.ok || !result?.success) {
          return {
            success: false,
            message: result?.message || "Something went wrong. Please try again.",
          };
        }

        setLeadCaptured(true);
        appendMessage({
          id: generateId(),
          role: "assistant",
          kind: "lead-success",
          content:
            "Thank you! Our sales team has received your details and will reach out shortly.",
          createdAt: new Date().toISOString(),
        });

        return { success: true, message: result.message };
      } catch (error) {
        console.error("submitLead failed:", error);
        return {
          success: false,
          message: "I couldn't reach our servers just now. Please try again.",
        };
      }
    },
    [appendMessage, messages, resolvedToken, setLeadCaptured]
  );

  const buildWhatsAppLink = useCallback(() => {
    const summary = buildConversationSummary(messages);
    const intro = "Hi KB West Walk, I was chatting with your AI consultant:";
    const text = summary ? `${intro}\n\n${summary}` : intro;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [messages]);

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      isOpen,
      isMinimized,
      isTyping,
      unreadCount,
      leadCaptured,
      openChat,
      closeChat,
      toggleChat,
      minimizeChat,
      maximizeChat,
      sendMessage,
      submitLead,
      buildWhatsAppLink,
    }),
    [
      messages,
      isOpen,
      isMinimized,
      isTyping,
      unreadCount,
      leadCaptured,
      openChat,
      closeChat,
      toggleChat,
      minimizeChat,
      maximizeChat,
      sendMessage,
      submitLead,
      buildWhatsAppLink,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }
  return context;
}