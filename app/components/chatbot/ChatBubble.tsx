"use client";

import LeadCaptureForm from "@/app/components/chatbot/LeadCaptureForm";
import type { ChatMessage } from "@/app/types/chat";

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (message.kind === "lead-form") {
    return (
      <div className="flex flex-col items-start gap-1">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-2.5 text-sm leading-relaxed text-[#f0ece2]">
          {message.content}
        </div>
        <LeadCaptureForm />
      </div>
    );
  }

  const bubbleClasses = isUser
    ? "bg-[#8b1a1a] text-white rounded-br-sm"
    : message.kind === "error"
    ? "bg-red-950/40 border border-red-500/30 text-red-200 rounded-bl-sm"
    : message.kind === "lead-success"
    ? "bg-[#d4af5a]/15 border border-[#d4af5a]/40 text-[#f0ece2] rounded-bl-sm"
    : "bg-white/[0.06] text-[#f0ece2] rounded-bl-sm";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${bubbleClasses}`}
      >
        {message.content || "\u00A0"}
      </div>
      <span className="mt-1 px-1 text-[10px] text-[#7a7f8f]">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}