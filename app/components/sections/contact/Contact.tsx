"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  return (

    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-220px] top-0 h-[500px] w-[500px] rounded-full bg-[#d4af5a]/5 blur-[170px]" />

        <div className="absolute right-[-220px] bottom-0 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[170px]" />

      </div>

      <div className="container relative z-10 flex flex-col items-center">
        {/* Heading */}

      {/* Heading */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="flex w-full flex-col items-center justify-center"
>

  <p className="text-center text-xl uppercase tracking-[8px] text-[#d4af5a]">
    CONTACT US
  </p>

  <div className="mt-6"></div>

  <div className="w-full max-w-4xl text-center">

    <h2 className="font-serif text-5xl leading-tight lg:text-6xl">

      <span className="block text-[#f0ece2]">
        Let's Build Your
      </span>

      <span className="block text-[#d4af5a]">
        Investment Journey
      </span>

    </h2>

  </div>

  <div className="mt-8 w-full max-w-3xl text-center">

    <p className="text-xl leading-10 text-[#b8bcc8]">

      Connect with our team to receive pricing,
      floor plans, brochures and the latest project updates.

    </p>

  </div>

</motion.div>

      <div className="mx-auto mt-24 w-full max-w-6xl grid gap-16 lg:grid-cols-3">
                  {/* PHONE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af5a]/30 bg-[#121b2d]">

            <Phone size={30} className="text-[#d4af5a]" />

          </div>

          <h3 className="mt-8 text-3xl font-serif text-[#f0ece2]">

            Phone

          </h3>

          <div className="mx-auto mt-5 h-px w-24 bg-[#d4af5a]/30"></div>

          <a
            href="tel:8587870099"
            className="mt-6 block text-xl text-[#b8bcc8] transition-colors duration-300 hover:text-[#d4af5a]"
          >
            +91 8587870099
          </a>

        </motion.div>

        {/* EMAIL */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af5a]/30 bg-[#121b2d]">

            <Mail size={30} className="text-[#d4af5a]" />

          </div>

          <h3 className="mt-8 text-3xl font-serif text-[#f0ece2]">

            Email

          </h3>

          <div className="mx-auto mt-5 h-px w-24 bg-[#d4af5a]/30"></div>

          <p className="mt-6 text-xl text-[#b8bcc8]">

            Coming Soon

          </p>

        </motion.div>

        {/* ADDRESS */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af5a]/30 bg-[#121b2d]">

            <MapPin size={30} className="text-[#d4af5a]" />

          </div>

          <h3 className="mt-8 text-3xl font-serif text-[#f0ece2]">

            Address

          </h3>

          <div className="mx-auto mt-5 h-px w-24 bg-[#d4af5a]/30"></div>

          <p className="mt-6 text-lg leading-9 text-[#b8bcc8]">

            KB West Walk,<br />

            Plot C-3, Sector Ecotech-12,<br />

            Roza Yakubpur,<br />

            Greater Noida, Ithaira,<br />

            Uttar Pradesh 201318

          </p>

        </motion.div>

      </div>

      {/* CTA */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 flex justify-center"
      >

        <button
          onClick={() => {
            const element = document.getElementById("enquiry-form");
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }}
          className="inline-flex items-center gap-3 rounded-full border border-[#d4af5a] px-10 py-5 text-xl font-semibold text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a] hover:shadow-[0_0_30px_rgba(212,175,90,.35)]"
        >

          Enquire Now

          <ArrowRight size={22} />

        </button>

      </motion.div>
            </div>

    </section>

  );
}