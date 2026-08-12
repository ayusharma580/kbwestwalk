"use client";

import { motion } from "framer-motion";
import {
  Train,
  Plane,
  Route,
  Hospital,
  GraduationCap,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const locationData = [
  {
    icon: Train,
    title: "METRO",
    description: "15 min drive from Sec-52 Metro",
  },
  {
    icon: Plane,
    title: "AIRPORT",
    description: "Hindon Airport approx. 25 km away",
  },
  {
    icon: Route,
    title: "HIGHWAYS",
    description: "10 min connectivity from NH-24",
  },
  {
    icon: Hospital,
    title: "HEALTHCARE",
    description: "10 min drive from Max Super Speciality Hospital",
  },
  {
    icon: GraduationCap,
    title: "SCHOOLS",
    description: "DPS, Lotus Valley, GD Goenka",
  },
  {
    icon: MapPin,
    title: "LANDMARKS",
    description: "Well connected to Noida & Greater Noida",
  },
];

export default function Location() {
  return (
    <section
      id="location"
      className="relative overflow-hidden bg-[#0a0e1a] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-250px] top-0 h-[500px] w-[500px] rounded-full bg-[#d4af5a]/5 blur-[180px]" />

        <div className="absolute right-[-250px] bottom-0 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[180px]" />

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

            LOCATION ADVANTAGE

          </p>

          <div className="h-12"></div>

          <h2 className="font-serif text-6xl leading-tight lg:text-7xl">

            <span className="text-[#f0ece2]">

              Well Connected.

            </span>

            <br />

            <span className="text-[#d4af5a]">

              Well Positioned.

            </span>

          </h2>

        </motion.div>

        <div className="mt-24 grid gap-20 lg:grid-cols-2 items-start">
                  {/* LEFT - GOOGLE MAP */}

        <motion.a
          href="https://www.google.com/maps/place/KB+West+Walk/@28.6002493,77.4509271,17z/data=!3m1!4b1!4m6!3m5!1s0x390cef006f798f4f:0x3d1bf816210e1b71!8m2!3d28.6002493!4d77.453502!16s%2Fg%2F11xt05z2nl?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -6 }}
          className="group"
        >
          <div className="overflow-hidden rounded-[30px] border border-[#d4af5a]/20 bg-[#121b2d] transition-all duration-500 group-hover:border-[#d4af5a] group-hover:shadow-[0_0_35px_rgba(212,175,90,.25)]">

            <div className="relative h-[520px]">

              <img
                src="/images/location/map.png"
                alt="KB West Walk Location"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">

                <h3 className="font-serif text-4xl text-white">

                  KB West Walk

                </h3>

                <p className="mt-2 text-lg text-gray-200">

                  Click to open Google Maps

                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af5a] px-6 py-3 text-[#d4af5a] transition-all duration-300 group-hover:bg-[#d4af5a] group-hover:text-[#0a0e1a]">

                  View Location

                  <ArrowUpRight size={18} />

                </div>

              </div>

            </div>

          </div>

        </motion.a>

        {/* RIGHT - LOCATION DETAILS */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >

          {locationData.map((item, index) => {

            const Icon = item.icon;

            return (

              <div key={index}>

                <div className="flex items-start gap-5">

                  <div className="mt-1">

                    <Icon
                      size={34}
                      className="text-[#d4af5a]"
                    />

                  </div>

                  <div>

                    <h3 className="text-2xl font-semibold tracking-wide text-[#f0ece2]">

                      {item.title}

                    </h3>

                    <p className="mt-2 text-lg text-[#b8bcc8]">

                      {item.description}

                    </p>

                  </div>

                </div>

                {index !== locationData.length - 1 && (

                  <div className="mt-7 h-px w-full bg-[#d4af5a]/20" />

                )}

              </div>

            );

          })}

        </motion.div>
                </div>

      </div>

    </section>

  );
}