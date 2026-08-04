"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0a0e1a] py-28">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-3xl border border-[#d4af5a]/20 bg-[#111827] p-12 text-center"
        >

          <p className="mb-3 uppercase tracking-[6px] text-[#d4af5a]">
            CONTACT US
          </p>

          <h2 className="mb-6 text-5xl font-serif text-[#f0ece2]">
            Let's Build Your
            <span className="text-[#d4af5a]"> Investment Journey</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl leading-8 text-[#b5b8c5]">
            Connect with our team to receive pricing, floor plans,
            brochures and the latest project updates.
          </p>

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[#f0ece2]">
                Phone
              </h3>

              <p className="text-[#d4af5a]">
                +91 XXXXXXXXXX
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[#f0ece2]">
                Email
              </h3>

              <p className="text-[#d4af5a]">
                info@kbwestwalk.com
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[#f0ece2]">
                Address
              </h3>

              <p className="text-[#d4af5a]">
                Coming Soon
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}