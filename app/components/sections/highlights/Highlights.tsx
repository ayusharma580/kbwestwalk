"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  {
    title: "Prime Location",
    description:
      "Strategically located at Roza Yakubpur, Greater Noida with seamless connectivity to NH-24, Noida Extension and upcoming infrastructure.",
  },
  {
    title: "Premium Retail Spaces",
    description:
      "High-street retail shops designed for maximum visibility, premium brands and strong customer footfall.",
  },
  {
    title: "Grade A Office Spaces",
    description:
      "Modern commercial spaces with premium architecture, efficient layouts and world-class specifications.",
  },
  {
    title: "Food Court & Multiplex",
    description:
      "A vibrant entertainment zone featuring restaurants, cafés, food brands and multiplex experiences.",
  },
  {
    title: "Studio Apartments",
    description:
      "Fully loaded studio apartments designed for professionals, investors and excellent rental returns.",
  },
  {
    title: "High Investment Potential",
    description:
      "Located in one of Greater Noida's fastest-growing corridors with excellent appreciation and long-term value.",
  },
];

export default function Highlights() {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-[350px] w-[350px] rounded-full bg-[#d4af5a]/5 blur-[160px]" />

        <div className="absolute -right-32 bottom-20 h-[350px] w-[350px] rounded-full bg-blue-900/10 blur-[170px]" />

      </div>

      <div className="container relative z-10 max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">

            PROJECT HIGHLIGHTS

          </p>

          <div className="h-12"></div>

          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

            <span className="text-[#f0ece2]">

              Why Choose

            </span>

            <br />

            <span className="text-[#d4af5a]">

              KB West Walk

            </span>

          </h2>

        </motion.div>

        <div className="mt-20 grid gap-x-20 gap-y-14 lg:grid-cols-2">
          {highlights.map((item, index) => (

  <motion.div
    key={item.title}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: index * 0.12,
    }}
    viewport={{ once: true }}
    className="group"
  >

    <div className="flex items-start gap-5">

      <CheckCircle2
        size={28}
        className="mt-1 text-white transition-all duration-300 group-hover:text-[#d4af5a]"
      />

      <div>

        <h3 className="text-2xl font-serif text-white transition-all duration-300 group-hover:text-[#d4af5a]">

          {item.title}

        </h3>

        <div className="mt-3 mb-5 h-[2px] w-0 bg-[#d4af5a] transition-all duration-500 group-hover:w-20"></div>

        <p className="text-lg leading-8 text-[#b8bcc8]">

          {item.description}

        </p>

      </div>

    </div>

  </motion.div>

))}
        </div>

      </div>

    </section>
  );
}