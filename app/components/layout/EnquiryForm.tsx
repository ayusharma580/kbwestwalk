"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile: phone,
          email,
          comments: message,
          sourcePage:
            typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Something went wrong. Please try again.");
      }

      alert(result.message || "Thank you! Our sales team will contact you shortly.");

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("EnquiryForm submit failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry-form"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-220px] top-[-120px] h-[500px] w-[500px] rounded-full bg-[#d4af5a]/5 blur-[180px]" />
        <div className="absolute right-[-220px] bottom-[-120px] h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[180px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-7xl text-center"
        >
          <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">
            ENQUIRE NOW
          </p>
          <div className="h-12" />
          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">
            <span className="block text-[#f0ece2]">Book Your</span>
            <span className="mt-2 block text-[#d4af5a]">Site Visit</span>
          </h2>
          <p className="mx-auto mt-8 w-full max-w-xl text-center text-lg leading-10 text-[#b8bcc8]">
            Receive pricing, floor plans, brochures and exclusive offers directly from our sales team.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 mx-auto mt-24 w-full max-w-7xl px-8 lg:px-12"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="relative z-10 h-16 w-full rounded-2xl border border-[#d4af5a]/20 bg-[#121b2d] px-6 text-lg text-white placeholder:text-[#8e93a3] outline-none transition-all duration-300 focus:border-[#d4af5a] focus:ring-2 focus:ring-[#d4af5a]/20"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="relative z-10 h-16 w-full rounded-2xl border border-[#d4af5a]/20 bg-[#121b2d] px-6 text-lg text-white placeholder:text-[#8e93a3] outline-none transition-all duration-300 focus:border-[#d4af5a] focus:ring-2 focus:ring-[#d4af5a]/20"
            />
          </div>

          <div className="mt-10">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="relative z-10 h-16 w-full rounded-2xl border border-[#d4af5a]/20 bg-[#121b2d] px-6 text-lg text-white placeholder:text-[#8e93a3] outline-none transition-all duration-300 focus:border-[#d4af5a] focus:ring-2 focus:ring-[#d4af5a]/20"
            />
          </div>

          <div className="mt-10">
            <textarea
              rows={5}
              name="message"
              placeholder="Tell us what you're looking for..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="relative z-10 w-full resize-none rounded-2xl border border-[#d4af5a]/20 bg-[#121b2d] px-6 py-5 text-lg text-white placeholder:text-[#8e93a3] outline-none transition-all duration-300 focus:border-[#d4af5a] focus:ring-2 focus:ring-[#d4af5a]/20"
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#b8bcc8]">
            <ShieldCheck size={18} className="text-[#d4af5a]" />
            <span>Your information is secure. No spam. Only project updates.</span>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="relative z-10 inline-flex items-center gap-3 rounded-full bg-[#d4af5a] px-12 py-4 text-lg font-semibold text-[#0a0e1a] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2bf62] hover:shadow-[0_0_30px_rgba(212,175,90,0.35)] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Book Site Visit"}
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}