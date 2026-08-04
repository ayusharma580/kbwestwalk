"use client";

import { motion } from "framer-motion";

const gallery = [
  {
    title: "Exterior View",
  },
  {
    title: "Retail Arcade",
  },
  {
    title: "Office Lobby",
  },
  {
    title: "Food Court",
  },
  {
    title: "Entrance Plaza",
  },
  {
    title: "Night Elevation",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#0a0e1a] py-28">
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
            PROJECT GALLERY
          </p>

          <h2 className="text-5xl font-serif text-[#f0ece2]">
            Explore
            <span className="text-[#d4af5a]"> KB West Walk</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#b5b8c5]">
            A preview of the architecture, retail experience and premium
            commercial environment.
          </p>
        </motion.div>

        {/* Gallery Grid */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {gallery.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-[#d4af5a]/20 bg-[#111827] transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af5a]"
            >
              {/* Image Placeholder */}

              <div className="flex h-72 items-center justify-center bg-[#162033]">

                <div className="text-center">

                  <div className="mb-4 text-6xl">
                    🖼️
                  </div>

                  <p className="text-[#b5b8c5]">
                    Gallery Image
                  </p>

                </div>

              </div>

              {/* Title */}

              <div className="p-6">

                <h3 className="text-xl font-serif text-[#f0ece2]">
                  {image.title}
                </h3>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}