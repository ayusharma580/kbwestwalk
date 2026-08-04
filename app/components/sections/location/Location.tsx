"use client";

import { motion } from "framer-motion";

const locationAdvantages = [
  {
    title: "Metro Connectivity",
    distance: "Coming Soon",
  },
  {
    title: "Major Highway",
    distance: "Coming Soon",
  },
  {
    title: "Residential Catchment",
    distance: "Coming Soon",
  },
  {
    title: "Business District",
    distance: "Coming Soon",
  },
];

export default function Location() {
  return (
    <section id="location" className="bg-[#0a0e1a] py-28">
      <div className="container">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 uppercase tracking-[6px] text-[#d4af5a]">
            LOCATION ADVANTAGE
          </p>

          <h2 className="text-5xl font-serif text-[#f0ece2]">
            Well Connected.
            <span className="text-[#d4af5a]"> Well Positioned.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#b5b8c5]">
            KB West Walk enjoys excellent connectivity, making it an ideal
            destination for businesses, investors and visitors.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Map Placeholder */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex h-[500px] items-center justify-center rounded-3xl border border-[#d4af5a]/20 bg-[#111827]"
          >
            <div className="text-center">

              <div className="mb-5 text-6xl">
                📍
              </div>

              <h3 className="mb-3 text-2xl font-serif text-[#f0ece2]">
                Google Map
              </h3>

              <p className="text-[#b5b8c5]">
                Google Maps will be added here later.
              </p>

            </div>
          </motion.div>

          {/* Location Cards */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            {locationAdvantages.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#d4af5a]/20 bg-[#111827] p-6 transition-all duration-300 hover:border-[#d4af5a]"
              >
                <h3 className="mb-2 text-xl font-semibold text-[#f0ece2]">
                  {item.title}
                </h3>

                <p className="text-[#d4af5a]">
                  {item.distance}
                </p>
              </div>
            ))}

          </motion.div>

        </div>

      </div>
    </section>
  );
}