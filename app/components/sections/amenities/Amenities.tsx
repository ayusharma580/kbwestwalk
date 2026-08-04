"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const amenities = [
  {
    title: "Luxury Retail",
    image: "/images/amenities/luxury-retail.png",
  },
  {
    title: "Premium Offices",
    image: "/images/amenities/premium-offices.png",
  },
  {
    title: "Fine Dining",
    image: "/images/amenities/fine-dining.png",
  },
  {
    title: "Luxury Shopping",
    image: "/images/amenities/luxury-shopping.png",
  },
  {
    title: "Prime Location",
    image: "/images/amenities/prime-location.png",
  },
  {
    title: "Multiplex",
    image: "/images/amenities/multiplex.png",
  },
];

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#d4af5a]/5 blur-[180px]" />

        <div className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-blue-900/10 blur-[180px]" />

      </div>

      <div className="container relative z-10 max-w-7xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">

            WORLD CLASS AMENITIES

          </p>

          <div className="h-12"></div>

          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

            <span className="text-[#f0ece2]">

              Everything

            </span>

            <br />

            <span className="text-[#d4af5a]">

              You Need

            </span>

          </h2>

        </motion.div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                  {amenities.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
            }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >

            <div className="relative h-[300px] overflow-hidden rounded-[28px]">

              {/* Image */}

              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all duration-500 group-hover:from-black/65"></div>

              {/* Gold Border */}

              <div className="absolute inset-0 rounded-[28px] border border-[#d4af5a]/20 transition-all duration-500 group-hover:border-[#d4af5a]/80"></div>

              {/* Title */}

              <div className="absolute bottom-0 left-0 w-full p-8">

                <h3 className="font-serif text-4xl text-white transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#d4af5a]">

                  {item.title}

                </h3>

              </div>

            </div>

          </motion.div>

        ))}
                </div>

      </div>

    </section>
  );
}