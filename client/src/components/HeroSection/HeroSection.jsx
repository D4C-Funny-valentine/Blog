import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { dummyData } from "../../dummyData/data";
import Button from "../ui/Button";
import "./herosection.css";
import { CiBookmarkPlus } from "react-icons/ci";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useGetAllBlogQuery } from "../../redux/services/api/blogApi";
import { formatDate } from "../../utils/autoDateChange";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { data, isLoading } = useGetAllBlogQuery(1);

  if (isLoading) {
    return (
      <div className="w-full h-[80%] flex justify-center items-center">
        <h3 className="text-6xl text-center text-white">Loading...</h3>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto">
      <Splide
        options={{
          type: "loop",
          arrows: true,
        }}
      >
        {data === undefined
          ? dummyData.blogs.map((blog) => (
              <SplideCard blog={blog} key={blog.id} />
            ))
          : data?.blogs.map((blog) => <SplideCard blog={blog} key={blog.id} />)}
      </Splide>
    </div>
  );
};

const SplideCard = ({ blog }) => {
  const { autoOpenModalHandlerWhenNoToken } = useModal();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userStore);
  return (
    <SplideSlide className="" key={blog?.id}>
      <div className="relative w-full h-full">
        <div className="flex flex-col justify-center items-center gap-8 h-full z-20 w-full">
          <div className="w-full md:w-4/5 lg:w-4/5 xl:w-1/2 mx-auto flex justify-center items-center">
            <h2 className="text-6xl font-semibold uppercase text-center text-white tracking-wide leading-[80px]">
              {blog?.title}
            </h2>
          </div>
          <div className="mb-4 text-white capitalize font-domine text-sm flex gap-2">
            <p className="">By {blog?.userInfo?.username}</p>
            <p>/ {formatDate(blog?.createdAt)}</p>
          </div>
          <div className="flex gap-8 items-center">
            <Button
              bgColor={"bg-white"}
              textColor={"text-primary"}
              text={"READ ON"}
              onclick={() => navigate(`/blog/detail/${blog.id}`)}
            />
            <Button
              borderColor={"border-white"}
              bgColor={"bg-transparent"}
              textColor={"text-white"}
              icon={
                <CiBookmarkPlus
                  size={14}
                  className="text-white"
                  strokeWidth={2}
                />
              }
              text={"READ LATER"}
              onclick={() => autoOpenModalHandlerWhenNoToken(token)}
            />
          </div>
        </div>
        <div className="text-[36rem] text-secondary font-semibold absolute uppercase bottom-0 top-32 left-[50%] translate-x-[-50%] flex justify-center items-center z-[-1]">
          <h1>{blog?.title[0]}</h1>
        </div>
      </div>
    </SplideSlide>
  );
};

export default HeroSection;
