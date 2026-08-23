"use client";

import { Phone } from "lucide-react";

import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function FloatingSocialButtons() {
  return (
    <div
      className="
        fixed
        right-5
        bottom-24
        z-40
        flex
        flex-col
        gap-3
      "
    >
      {/* Instagram */}
      <a
        href="https://www.instagram.com/kb_west_walk_?igsi=MTVoYTc5YmlqZWJhcw=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-purple-600
          via-pink-500
          to-orange-400
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-xl
        "
      >
        <FaInstagram size={22} />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61592619102391"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#1877F2]
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-xl
        "
      >
        <FaFacebookF size={22} />
      </a>

      {/* Phone */}
      <a
        href="tel:+919411019656"
        aria-label="Call KB West Walk"
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#8b1a1a]
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-xl
        "
      >
        <Phone size={22} />
      </a>
    </div>
  );
}