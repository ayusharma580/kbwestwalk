"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Overview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="overview"
      className="bg-[#0a0e1a] pt-6 pb-28"
    >
      <div className="container max-w-7xl px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto"
        >

          {/* Heading */}

          <div className="text-center">

            <p className="text-xl uppercase tracking-[8px] text-[#d4af5a]">

              PROJECT OVERVIEW

            </p>

            <div className="h-12"></div>

            <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

              <span className="text-[#f0ece2]">

                A New Landmark

              </span>

              <br />

              <span className="text-[#d4af5a]">

                For Business & Lifestyle

              </span>

            </h2>

          </div>

          <div className="mt-6 w-full max-w-7xl mx-auto px-8 lg:px-12">

            <p className="mb-10 max-w-none text-lg leading-10 text-[#b8bcc8] text-justify">

               KB WEST WALK is a premium mixed-use commercial development located at Roza Yakubpur, Greater Noida (Ithaira), Uttar Pradesh – 201318. Designed as a modern high-street destination, the project offers an excellent blend of retail shops, food court, multiplex, and fully loaded studio apartments, making it an ideal choice for both investors and end users.


            </p>

            <p className="mb-10 text-lg leading-10 text-[#b8bcc8] text-justify">

              Spread across 20 well-planned floors, KB WEST WALK is thoughtfully zoned to maximize footfall and returns. The Lower Ground Floor (LGF) to 3rd Floor is dedicated to high-visibility retail shops, offering sizes ranging from 150 sq.ft to 1200 sq.ft, suitable for branded showrooms, daily-need stores, and premium outlets. Attractive pricing starts from ₹25,900/sq.ft for LGF, ₹37,900/sq.ft for Ground Floor, ₹24,900/sq.ft for 1st Floor, ₹20,900/sq.ft for 2nd Floor, and ₹17,900/sq.ft for 3rd Floor, making it a lucrative commercial investment.

            </p>

            <motion.div
              initial={false}
              animate={{
                height: expanded ? "auto" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
                            <div>

                <p className="mb-10 text-lg leading-10 text-[#b8bcc8] text-justify">

                  The 4th and 5th Floors are reserved for a vibrant food court and multiplex, offering food court units from 160 sq.ft to 600 sq.ft—perfect for cafes, QSR brands, and fine-dining concepts. This entertainment zone ensures consistent daily footfall and long-term rental demand.

                </p>

                <p className="mb-10 text-lg leading-10 text-[#b8bcc8] text-justify">

                  From the 6th to 20th Floor, the project features fully loaded studio apartments, ideal for professionals, working executives, and investors looking for assured rental income. KB WEST WALK presents a strong early-entry opportunity in the rapidly developing Greater Noida region. Overall, KB WEST WALK stands out as a future-ready commercial and lifestyle hub with excellent connectivity, strong investment potential, and multiple income streams.

                </p>

                <p className="text-lg leading-10 text-[#b8bcc8] text-justify">

                  Explore KB West Walk, offering premium Retail Shops in Greater Noida West, modern Commercial Property Noida Extension, and stylish Studio Apartment Greater Noida West. Whether you're seeking Investment Property Noida Extension for rental income or long-term appreciation, KB West Walk combines a prime location, excellent connectivity, and strong growth potential in one destination.

                </p>

              </div>

            </motion.div>

            <div className="mt-16 flex justify-center">

              <button
                onClick={() => setExpanded(!expanded)}
                className="rounded-full border border-[#d4af5a] bg-transparent px-10 py-4 text-base font-semibold text-[#d4af5a] transition-all duration-300 hover:bg-[#d4af5a] hover:text-[#0a0e1a]"
              >
                {expanded ? "Show Less" : "Know More"}
              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );
}