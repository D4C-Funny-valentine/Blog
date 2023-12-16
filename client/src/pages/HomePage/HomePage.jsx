import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import LatestBlog from "./LatestBlog";

const HomePage = () => {
  return (
    <>
      <section className="relative h-full">
        <div className={`h-[90vh] w-full bg-primary overflow-hidden`}>
          <div className="pt-28 w-full h-full">
            <HeroSection />
          </div>
        </div>

        <div className="relative w-full h-full bg-dusty pb-16">
          <div className="w-[65%] bg-white mx-auto shadow-xl -translate-y-24">
            <LatestBlog />
          </div>
          <div className="bg-white"></div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
