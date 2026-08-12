"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/images/gallery/gallery1.png",
  "/images/gallery/gallery2.png",
  "/images/gallery/gallery3.png",
  "/images/gallery/gallery4.png",
  "/images/gallery/gallery5.png",
  "/images/gallery/gallery6.png",
];

export default function Gallery() {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentIndex((prev) =>
        (prev + 1) % galleryImages.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const nextSlide = () => {

    setCurrentIndex((prev) =>
      (prev + 1) % galleryImages.length
    );

  };

  const prevSlide = () => {

    setCurrentIndex((prev) =>
      (prev - 1 + galleryImages.length) %
      galleryImages.length
    );

  };

  const visibleImages = [];

  for (let i = 0; i < 4; i++) {

    visibleImages.push(
      galleryImages[
        (currentIndex + i) % galleryImages.length
      ]
    );

  }

  return (

    <section
      id="gallery"
      className="relative bg-[#0a0e1a] py-28 overflow-hidden"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-52 top-0 h-[500px] w-[500px] rounded-full bg-[#d4af5a]/5 blur-[170px]" />

        <div className="absolute -right-52 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[170px]" />

      </div>

      <div className="container relative z-10">

        {/* Heading */}

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: .8 }}

          className="text-center"

        >

          <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">

            PROJECT GALLERY

          </p>

          <div className="h-12"></div>

          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

            <span className="text-[#f0ece2]">

              Explore

            </span>

            {" "}

            <span className="text-[#d4af5a]">

              KB West Walk

            </span>

          </h2>

        </motion.div>

        {/* Gallery */}

        <div className="mt-20 flex justify-center gap-8">
                  {visibleImages.map((image, index) => (

          <motion.div

            key={image}

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5, delay: index * 0.08 }}

            whileHover={{ y: -8 }}

            className="group relative h-[230px] w-[300px] overflow-hidden rounded-[28px] border border-[#d4af5a]/20 bg-[#121b2d] shadow-lg"

          >

            <Image

              src={image}

              alt={`Gallery ${index + 1}`}

              fill

              className="object-cover transition-all duration-700 group-hover:scale-110"

            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/15 transition-all duration-500 group-hover:bg-black/5" />

            {/* Gold Border on Hover */}

            <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-500 group-hover:border-[#d4af5a]" />

          </motion.div>

        ))}

      </div>

      {/* Navigation */}

      <div className="mt-14 flex justify-center gap-6">

        <button

          onClick={prevSlide}

          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af5a]/30 bg-[#111827] text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]"

        >

          <ChevronLeft size={28} />

        </button>

        <button

          onClick={nextSlide}

          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af5a]/30 bg-[#111827] text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]"

        >

          <ChevronRight size={28} />

        </button>

      </div>
            </div>

    </section>

  );

}