import React from "react";
import UserBlogs from "../components/user/UserBlogs";

const UserBlogsPage = () => {
  return (
    <section className="bg-dusty pb-16 w-full h-full relative">
      <div className="h-full w-full">
        <div className="h-36 w-full bg-primary"></div>
        <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg p-10">
          <UserBlogs />
        </div>
      </div>
    </section>
  );
};

export default UserBlogsPage;
