"use client";

import { motion } from "framer-motion";

export default function RightSidebar() {
  return (
    <motion.div
      initial={{ x: 120 }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
      }}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="overflow-hidden rounded-2xl border border-[#d4af5a]/20 bg-[#111827]/95 shadow-2xl backdrop-blur-xl">

        {/* Call */}

        <button className="flex w-16 flex-col items-center justify-center gap-2 border-b border-[#d4af5a]/10 p-4 transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]">

          <span className="text-2xl">📞</span>

          <span className="text-[11px] font-medium tracking-wide">
            Call
          </span>

        </button>

        {/* WhatsApp */}

        <button className="flex w-16 flex-col items-center justify-center gap-2 border-b border-[#d4af5a]/10 p-4 transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]">

          <span className="text-2xl">💬</span>

          <span className="text-[11px] font-medium tracking-wide">
            Chat
          </span>

        </button>

        {/* Brochure */}

        <button className="flex w-16 flex-col items-center justify-center gap-2 border-b border-[#d4af5a]/10 p-4 transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]">

          <span className="text-2xl">📄</span>

          <span className="text-[11px] font-medium tracking-wide">
            Brochure
          </span>

        </button>

        {/* Enquiry */}

        <button className="flex w-16 flex-col items-center justify-center gap-2 p-4 transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]">

          <span className="text-2xl">✉️</span>

          <span className="text-[11px] font-medium tracking-wide">
            Enquiry
          </span>

        </button>

      </div>
    </motion.div>
  );
}