"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { User, Phone, Mail, MessageSquare, X } from "lucide-react";
import { usePopup } from "@/app/context/PopupContext";

export default function LeadPopup() {
  const { isOpen, closePopup } = usePopup();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    comments: "",
  });

  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to be contacted before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sourcePage:
            typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });

      // Read response as text first so we never crash on an empty body.
      const text = await response.text();

      let result: { success?: boolean; message?: string } | null = null;

      if (text) {
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          console.error("Failed to parse API response:", parseError, text);
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Something went wrong (status ${response.status}). Please try again.`
        );
      }

      if (!result) {
        throw new Error("Server returned an unexpected response.");
      }

      alert(result.message || "Thank you! We will get in touch shortly.");

      setFormData({
        name: "",
        mobile: "",
        email: "",
        comments: "",
      });

      closePopup();
    } catch (error: unknown) {
      console.error("Frontend Error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative flex w-full max-w-[900px] max-h-[90vh] bg-white shadow-2xl overflow-hidden flex-col md:flex-row"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* LEFT SIDE */}
            <div className="relative w-full md:w-[38%] h-[180px] md:h-auto shrink-0">
              <Image
                src="/popup/popup-image.png"
                alt="KB West Walk"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <div className="absolute top-4 left-4">
                <Image
                  src="/images/logo/logo.png"
                  alt="KB West Walk Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                <h2 className="text-white font-serif tracking-wide text-lg md:text-xl leading-tight mb-1">
                  KB WEST WALK
                </h2>
                <p
                  className="text-[11px] md:text-xs tracking-wide"
                  style={{ color: "#e2bf62" }}
                >
                  Retail Shops &nbsp;•&nbsp; Food Court &nbsp;•&nbsp; Studio Apartments
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="relative w-full md:w-[62%] flex flex-col overflow-y-auto"
              style={{ backgroundColor: "#e2bf62" }}
            >
              {/* HEADER */}
              <div className="relative pt-6 px-5 md:px-8 shrink-0">
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close popup"
                  className="absolute right-5 top-5 hover:opacity-60 transition-opacity"
                  style={{ color: "#8b1a1a" }}
                >
                  <X size={22} />
                </button>
                <h3
                  className="text-center font-serif text-xl md:text-2xl tracking-wide"
                  style={{ color: "#8b1a1a" }}
                >
                  Express Your Interest
                </h3>
                <div
                  className="w-10 h-[2px] mx-auto mt-2"
                  style={{ backgroundColor: "#8b1a1a" }}
                />
              </div>

              <div className="flex-1 px-5 md:px-8 pb-5 pt-4">
                <p
                  className="text-center text-[13px] md:text-sm mb-4 font-medium"
                  style={{ color: "#3a1010" }}
                >
                  Fill in your details and our team will get in touch.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex items-stretch bg-white border border-gray-300">
                    <span className="flex items-center justify-center w-[46px] shrink-0" style={{ color: "#8b1a1a" }}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full h-[46px] bg-transparent pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
                    />
                  </div>

                  <div className="flex items-stretch bg-white border border-gray-300">
                    <span className="flex items-center justify-center w-[46px] shrink-0" style={{ color: "#8b1a1a" }}>
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="w-full h-[46px] bg-transparent pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
                    />
                  </div>

                  <div className="flex items-stretch bg-white border border-gray-300">
                    <span className="flex items-center justify-center w-[46px] shrink-0" style={{ color: "#8b1a1a" }}>
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full h-[46px] bg-transparent pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
                    />
                  </div>

                  <div className="flex items-stretch bg-white border border-gray-300">
                    <span className="flex items-center justify-center w-[46px] shrink-0" style={{ color: "#8b1a1a" }}>
                      <MessageSquare size={18} />
                    </span>
                    <input
                      type="text"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Comments"
                      className="w-full h-[46px] bg-transparent pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none min-w-0"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[50px] text-white uppercase tracking-wide text-sm font-medium transition-colors disabled:opacity-70 mt-1"
                    style={{ backgroundColor: "#8b1a1a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7a1616")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8b1a1a")}
                  >
                    {submitting ? "Submitting..." : "Express Your Interest"}
                  </button>

                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0" style={{ accentColor: "#8b1a1a" }}
                    />
                    <span className="text-xs leading-snug" style={{ color: "#3a1010" }}>
                      By submitting this form, you authorize KB West Walk to
                      contact you via call, SMS, WhatsApp or email regarding
                      this project.
                    </span>
                  </label>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}