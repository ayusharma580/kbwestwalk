"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#d4af5a]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}