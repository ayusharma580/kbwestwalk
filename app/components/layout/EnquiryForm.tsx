"use client";

import { motion } from "framer-motion";

export default function EnquiryForm() {
  return (
    <section className="relative bg-[#0a0e1a] py-24">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl rounded-3xl border border-[#d4af5a]/20 bg-[#111827] p-10 shadow-2xl"
        >

          <div className="mb-10 text-center">

            <p className="mb-3 uppercase tracking-[6px] text-[#d4af5a]">
              Enquire Now
            </p>

            <h2 className="mb-4 text-4xl font-serif text-[#f0ece2]">
              Book Your Site Visit
            </h2>

            <p className="mx-auto max-w-2xl text-[#b5b8c5]">
              Fill in your details and our sales team will contact you shortly
              with pricing, availability and exclusive offers.
            </p>

          </div>

          <form className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Full Name"
              className="rounded-xl border border-[#d4af5a]/20 bg-[#0f172a] px-5 py-4 text-white outline-none transition focus:border-[#d4af5a]"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              className="rounded-xl border border-[#d4af5a]/20 bg-[#0f172a] px-5 py-4 text-white outline-none transition focus:border-[#d4af5a]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-xl border border-[#d4af5a]/20 bg-[#0f172a] px-5 py-4 text-white outline-none transition focus:border-[#d4af5a] md:col-span-2"
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="rounded-xl border border-[#d4af5a]/20 bg-[#0f172a] px-5 py-4 text-white outline-none transition focus:border-[#d4af5a] md:col-span-2"
            />

            <button
              type="submit"
              className="rounded-full bg-[#d4af5a] px-8 py-4 font-semibold text-[#0a0e1a] transition hover:scale-105 hover:shadow-xl md:col-span-2"
            >
              Submit Enquiry
            </button>

          </form>

        </motion.div>

      </div>
    </section>
  );
}