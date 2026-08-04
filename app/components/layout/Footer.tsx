export default function Footer() {
  return (
    <footer className="border-t border-[#d4af5a]/20 bg-[#0a0e1a]">
      <div className="container py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}

          <div>
            <div className="mb-5 h-[60px] w-[190px] rounded border border-dashed border-[#d4af5a]/30 flex items-center justify-center text-sm text-[#d4af5a]">
              Logo
            </div>

            <p className="text-[#b5b8c5] leading-7">
              KB West Walk is a premium commercial destination offering
              modern retail spaces, offices, dining and lifestyle experiences.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#f0ece2]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-[#b5b8c5]">
              <li><a href="#home">Home</a></li>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#highlights">Highlights</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#f0ece2]">
              Contact
            </h3>

            <ul className="space-y-3 text-[#b5b8c5]">
              <li>📍 Location Coming Soon</li>
              <li>📞 +91 XXXXXXXXXX</li>
              <li>✉️ info@kbwestwalk.com</li>
            </ul>
          </div>

          {/* Disclaimer */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#f0ece2]">
              Disclaimer
            </h3>

            <p className="text-[#b5b8c5] leading-7">
              This website is for informational purposes only. Images,
              layouts, specifications and other details are subject to
              change as per the developer's discretion.
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-[#d4af5a]/20 pt-6 text-center text-sm text-[#b5b8c5]">
          © {new Date().getFullYear()} KB West Walk. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}