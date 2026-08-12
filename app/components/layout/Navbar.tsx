"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePopup } from "@/app/context/PopupContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Highlights", href: "#highlights" },
  { label: "Amenities", href: "#amenities" },
  { label: "Floor Plans", href: "#floorplans" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openPopup } = usePopup();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[#d4af5a]/20 shadow-2xl backdrop-blur-2xl"
          : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(43, 13, 18, 0.82)"
          : "linear-gradient(90deg,#22080d 0%,#2b0d12 35%,#341016 70%,#22080d 100%)",
      }}
    >
      <div className="mx-auto flex h-24 max-w-[1600px] items-center px-10">

        {/* Logo */}

        <div className="w-[220px] flex-shrink-0">
          <Link href="/" className="flex items-center">
  <Image
    src="/images/logo/logo.png"
    alt="KB West Walk Logo"
    width={180}
    height={60}
    priority
    className="h-[60px] w-auto object-contain"
  />
</Link>
        </div>

        {/* Navigation */}

        <div className="flex flex-1 justify-center">
          <nav className="flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-[14px] uppercase tracking-[2px] text-[#f0ece2] transition-all duration-300 hover:text-[#d4af5a]"
              >
                {item.label}

                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#d4af5a] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA */}

        <div className="w-[220px] flex justify-end">
          <button
  onClick={() => {
  console.log("Button Clicked");
  openPopup("Express Your Interest");
}}
  className="rounded-full border border-[#d4af5a] bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[2px] text-[#d4af5a] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#d4af5a] hover:text-[#2b0d12] hover:shadow-[0_0_30px_rgba(212,175,90,0.35)]"
>
            Enquire Now
          </button>
        </div>

      </div>
    </motion.header>
  );
}