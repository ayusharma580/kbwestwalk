"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useChat } from "@/app/context/ChatContext";
import ChatWindow from "@/app/components/chatbot/ChatWindow";

export default function Chatbot() {
  const { isOpen, isMinimized, unreadCount, toggleChat } = useChat();

  const windowVisible = isOpen && !isMinimized;

  return (
    <>
      <AnimatePresence>{windowVisible && <ChatWindow />}</AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Chat with KB West Walk"}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-5 right-4 z-[96] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af5a] via-[#e7c676] to-[#8b1a1a] shadow-[0_10px_35px_rgba(212,175,90,0.4)]"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#d4af5a]/30" />

        {windowVisible ? (
          <X size={26} className="text-[#0a0e1a]" />
        ) : (
          <MessageCircle size={26} className="text-[#0a0e1a]" />
        )}

        {!windowVisible && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#0a0e1a] bg-[#8b1a1a] px-1 text-[11px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </motion.button>
    </>
  );
}