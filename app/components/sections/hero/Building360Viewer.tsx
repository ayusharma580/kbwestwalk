"use client";

import { motion } from "framer-motion";

export default function Building360Viewer() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-3xl border border-[#d4af5a]/20 bg-[#111827] shadow-2xl"
    >
      {/* Placeholder Image */}

      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#111827] via-[#162033] to-[#0a0e1a]">

        <div className="text-center">

          <div className="mb-5 text-6xl">
            🏢
          </div>

          <h3 className="mb-3 text-2xl font-serif text-[#f0ece2]">
            360° Building Viewer
          </h3>

          <p className="mx-auto max-w-md text-[#b5b8c5]">
            Your interactive building view will be added here later.
          </p>

        </div>

      </div>

      {/* Badge */}

    </motion.div>
  );
}