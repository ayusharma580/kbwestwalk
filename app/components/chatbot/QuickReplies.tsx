"use client";

import type { QuickReply } from "@/app/types/chat";

const QUICK_REPLIES: QuickReply[] = [
  { label: "Show Price", message: "Tell me the price" },
  { label: "Floor Plan", message: "Show me the floor plans" },
  { label: "Investment Benefits", message: "What are the investment benefits?" },
  { label: "Location", message: "Tell me about the location" },
  { label: "Book Site Visit", message: "I want to book a site visit" },
  { label: "Download Brochure", message: "I want the brochure" },
  { label: "Call Sales Team", message: "Call me" },
];

type QuickRepliesProps = {
  disabled?: boolean;
  onSelect: (message: string) => void;
};

export default function QuickReplies({ disabled, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {QUICK_REPLIES.map((reply) => (
        <button
          key={reply.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply.message)}
          className="rounded-full border border-[#d4af5a]/40 bg-[#d4af5a]/10 px-3 py-1.5 text-xs font-medium text-[#e7c676] transition-colors hover:bg-[#d4af5a]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}