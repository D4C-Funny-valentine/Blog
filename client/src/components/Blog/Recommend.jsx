import React from "react";
import { dummyData } from "../../dummyData/data";
import "./blog.css";
import { Link } from "react-router-dom";
import { useGetMostReadBlogQuery } from "../../redux/services/api/blogApi";
import { Loader } from "@mantine/core";
import { formatDate } from "../../utils/autoDateChange";

const Recommend = () => {
  const { data, isLoading } = useGetMostReadBlogQuery();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-[65%] mx-auto bg-white shadow-xl mb-10">
      <div className="flex flex-wrap justify-center items-center">
        {isLoading ? (
          <div className="h-52 flex justify-center items-center">
            <Loader size={"md"} color="red" />
          </div>
        ) : (
          <>
            {data?.blogs.map((item) => (
              <Link
                to={`/blog/detail/${item.id}`}
                key={item.id}
                onClick={handleClick}
              >
                <div className="relative w-[450px] h-[400px] flex justify-center items-center flex-col gap-6 recommend-blog cursor-pointer">
                  <h3 className="text-3xl font-semibold hover:text-primary duration-300 uppercase w-4/5 text-center title">
                    {item.title}
                  </h3>
                  <div className="font-domine text-sm text-gray-500/90 flex gap-2">
                    <span className="uppercase">{item.userInfo?.username}</span>{" "}
                    <span>/ {formatDate(item.createdAt)}</span>
                  </div>
                  <h1 className="text-[17rem] font-semibold text-gray-400/30 uppercase absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
                    {item.title[0]}
                  </h1>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommend;
