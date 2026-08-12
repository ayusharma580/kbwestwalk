"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Send, MessageCircleHeart } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";
import ChatBubble from "@/app/components/chatbot/ChatBubble";
import TypingIndicator from "@/app/components/chatbot/TypingIndicator";
import QuickReplies from "@/app/components/chatbot/QuickReplies";

export default function ChatWindow() {
  const { messages, isTyping, closeChat, minimizeChat, sendMessage, buildWhatsAppLink } =
    useChat();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showQuickReplies = messages.length <= 1 && !isTyping;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-24 right-4 z-[95] flex h-[min(640px,calc(100dvh-140px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-[#d4af5a]/25 bg-[#0a0e1a]/85 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#d4af5a]/20 bg-gradient-to-r from-[#0a0e1a] to-[#141a2c] px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af5a] to-[#8b1a1a]">
            <MessageCircleHeart size={20} className="text-white" />
          </div>
          <div>
            <p className="font-serif text-sm text-[#f0ece2]">KB West Walk</p>
            <p className="text-[11px] tracking-wide text-[#d4af5a]">
              AI Property Consultant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={minimizeChat}
            aria-label="Minimize chat"
            className="rounded-full p-1.5 text-[#b5b8c5] transition-colors hover:bg-white/10 hover:text-[#f0ece2]"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="rounded-full p-1.5 text-[#b5b8c5] transition-colors hover:bg-white/10 hover:text-[#f0ece2]"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      {showQuickReplies && (
        <QuickReplies disabled={isTyping} onSelect={(msg) => sendMessage(msg)} />
      )}

      {/* WhatsApp handoff */}
      <div className="px-4 pb-2">
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 py-2 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
        >
          Continue on WhatsApp
        </a>
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-[#d4af5a]/20 bg-[#0a0e1a] px-3 py-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about pricing, floor plans, ROI..."
          rows={1}
          className="max-h-24 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-[#f0ece2] placeholder-[#7a7f8f] focus:border-[#d4af5a] focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8b1a1a] text-white transition-colors hover:bg-[#7a1616] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}