import Navbar from "./components/layout/Navbar";
import RightSidebar from "./components/layout/RightSidebar";
import EnquiryForm from "./components/layout/EnquiryForm";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/hero/Hero";
import Overview from "./components/sections/overview/Overview";
import Highlights from "./components/sections/highlights/Highlights";
import Amenities from "./components/sections/amenities/Amenities";
import FloorPlans from "./components/sections/floorplans/FloorPlans";
import Gallery from "./components/sections/gallery/Gallery";
import Location from "./components/sections/location/Location";
import Contact from "./components/sections/contact/Contact";

import Chatbot from "./components/chatbot/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />

      <RightSidebar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="overview">
          <Overview />
        </section>

        <section id="highlights">
          <Highlights />
        </section>

        <section id="amenities">
          <Amenities />
        </section>

        <section id="floorplans">
          <FloorPlans />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="location">
          <Location />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <EnquiryForm />

      <Footer />

      <Chatbot />
    </>
  );
}