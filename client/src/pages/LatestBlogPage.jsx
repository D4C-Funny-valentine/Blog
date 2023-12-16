import React from "react";
import LatestBlog from "./HomePage/LatestBlog";

const LatestBlogPage = () => {
  return (
    <section className="bg-dusty pb-16 w-full h-full relative">
      <div className="h-full w-full">
        <div className="h-36 w-full bg-primary"></div>
        <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg p-10">
          <LatestBlog />
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPage;
