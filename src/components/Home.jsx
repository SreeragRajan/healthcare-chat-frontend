
import React from "react";
import Hero from "./Sections/Hero";
import Faqs from "./Sections/Faqs";
import HowItWorks from "./Sections/HowItWorks";
import Footer from "./Sections/Footer";
import Features from "./Sections/features";

const Home = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <HowItWorks />
      <Faqs />
      <Features />
      <Footer />

    </main>
  );
};

export default Home;
