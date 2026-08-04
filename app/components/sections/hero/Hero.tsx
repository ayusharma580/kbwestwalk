"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0a0e1a] pt-12 pb-6"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-220px] top-[-150px] h-[500px] w-[500px] rounded-full bg-[#d4af5a]/10 blur-[170px]" />

        <div className="absolute right-[-180px] top-[80px] h-[450px] w-[450px] rounded-full bg-blue-900/20 blur-[170px]" />

      </div>

      {/* Main Content */}

      <div className="container relative z-10 py-8 pb-0">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="mb-6 uppercase tracking-[8px] text-[#d4af5a] text-lg">

              PREMIUM COMMERCIAL DEVELOPMENT

            </p>

            <h1 className="font-serif text-6xl leading-none text-[#f0ece2] xl:text-8xl">

              KB West Walk

            </h1>

            <div className="mt-6 mb-8 h-[3px] w-40 rounded-full bg-[#d4af5a]" />

            <p className="max-w-xl text-xl leading-10 text-[#b8bcc8]">

              Experience an iconic commercial destination where luxury retail,
              premium office spaces, fine dining and entertainment come together
              to redefine business and lifestyle.

            </p>

            <div className="mt-12">

              <a
                href="/KB-West-Walk_Brochure.pdf"
                download
                className="inline-flex items-center rounded-full border border-[#d4af5a] px-10 py-4 text-lg font-semibold text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a] hover:shadow-[0_0_30px_rgba(212,175,90,0.35)]"
              >

                Download Brochure

              </a>

            </div>

          </motion.div>

          {/* RIGHT */}
                    <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >

            <div className="relative w-full max-w-[720px]">

              <div className="rounded-[32px] border border-[#d4af5a]/20 bg-[#121b2d]/90 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">

                <div className="flex h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d4af5a]/20 bg-[#0f1726]">

                  <div className="mb-6 text-7xl">

                    🏢

                  </div>

                  <h2 className="font-serif text-5xl text-[#f0ece2]">

                    360° Building Viewer

                  </h2>

                  <p className="mt-6 max-w-md text-center text-lg leading-8 text-[#b8bcc8]">

                    Your interactive 360° building experience
                    will be available here.

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
          </section>
  );
}