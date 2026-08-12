"use client";

import { useState } from "react";
import { useChat } from "@/app/context/ChatContext";
import type { LeadFormData } from "@/app/types/chat";

const INITIAL_FORM: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  budget: "",
  interestedUnit: "",
  preferredTime: "",
};

export default function LeadCaptureForm() {
  const { submitLead } = useChat();
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Please fill your name, phone and email.");
      return;
    }

    setSubmitting(true);
    const result = await submitLead(form);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  if (submitted) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex w-full max-w-[280px] flex-col gap-2 rounded-2xl rounded-bl-sm border border-[#d4af5a]/25 bg-white/[0.06] p-4 backdrop-blur-sm"
    >
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name *"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number *"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address *"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />
      <input
        type="text"
        name="budget"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget (optional)"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />
      <input
        type="text"
        name="interestedUnit"
        value={form.interestedUnit}
        onChange={handleChange}
        placeholder="Interested Unit (optional)"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />
      <input
        type="text"
        name="preferredTime"
        value={form.preferredTime}
        onChange={handleChange}
        placeholder="Preferred Time (optional)"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#f0ece2] placeholder-[#b5b8c5] focus:border-[#d4af5a] focus:outline-none"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 w-full rounded-lg bg-[#8b1a1a] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#7a1616] disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}