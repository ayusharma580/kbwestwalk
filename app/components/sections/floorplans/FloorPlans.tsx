"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ruler } from "lucide-react";
import { usePopup } from "@/app/context/PopupContext";

const floorPlans = [
  {
    title: "Lower Ground Floor",
    image: "/images/floorplans/lower-ground.png",
    size: "150 - 1200 sq.ft",
  },
  {
    title: "Ground Floor",
    image: "/images/floorplans/ground.png",
    size: "150 - 1200 sq.ft",
  },
  {
    title: "First Floor",
    image: "/images/floorplans/first.png",
    size: "150 - 1200 sq.ft",
  },
  {
    title: "Second Floor",
    image: "/images/floorplans/second.png",
    size: "150 - 1200 sq.ft",
  },
  {
    title: "Third Floor",
    image: "/images/floorplans/third.png",
    size: "150 - 1200 sq.ft",
  },
  {
    title: "Fourth Floor",
    image: "/images/floorplans/fourth.png",
    size: "160 - 600 sq.ft",
  },
  {
    title: "Fifth Floor",
    image: "/images/floorplans/fifth.png",
    size: "160 - 600 sq.ft",
  },
  {
    title: "Seventh Floor",
    image: "/images/floorplans/seventh.png",
    size: "Studio Units",
  },
  {
    title: "Studio Floor",
    image: "/images/floorplans/studio.png",
    size: "Fully Loaded Studio",
  },
];

export default function FloorPlans() {
  const { openPopup } = usePopup();

  return (
    <section
      id="floorplans"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#d4af5a]/5 blur-[180px]" />

        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-900/10 blur-[180px]" />

      </div>

      <div className="container relative z-10 max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">

            FLOOR PLANS

          </p>

          <div className="h-12"></div>

          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

            <span className="text-[#f0ece2]">

              Explore Our

            </span>

            <br />

            <span className="text-[#d4af5a]">

              Spaces

            </span>

          </h2>

        </motion.div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                  {floorPlans.map((plan, index) => (

          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            className="group"
          >

            <div className="overflow-hidden rounded-[30px] border border-[#d4af5a]/20 bg-[#111827] transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af5a] hover:shadow-[0_20px_60px_rgba(212,175,90,0.15)]">

              {/* Floor Plan Image */}

              <div className="relative h-[270px] overflow-hidden">

                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              </div>

              {/* Content */}

              <div className="p-7">

                <h3 className="mb-5 font-serif text-3xl text-[#f0ece2] transition-colors duration-300 group-hover:text-[#d4af5a]">

                  {plan.title}

                </h3>

                <div className="mb-8 flex items-center gap-3 text-[#b8bcc8]">

                  <Ruler
                    size={20}
                    className="text-[#d4af5a]"
                  />

                  <span className="text-lg">

                    {plan.size}

                  </span>

                </div>

                <button
                  onClick={() => openPopup("Express Your Interest")}
                  className="w-full rounded-full border border-[#d4af5a] px-6 py-3 text-lg font-semibold text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]"
                >

                  Know Price

                </button>

              </div>

            </div>

          </motion.div>

        ))}
                </div>

      </div>

    </section>
  );
}