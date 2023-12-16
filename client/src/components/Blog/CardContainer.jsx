import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import BlogCard from "./BlogCard";
import Loader from "../ui/Loader";
import { Loader as Spinner } from "@mantine/core";

const CardContainer = ({ page, setPage, isLoading, data, isFetching }) => {
  const [blogs, setBlogs] = useState(data?.blogs || []);
  const [deletedBlogId, setDeletedBlogId] = useState(null);

  useEffect(() => {
    if (data) {
      setBlogs((prev) => {
        const uniqueBlogs = data.blogs.filter(
          (newBlog) => !prev.some((prevBlog) => prevBlog.id === newBlog.id)
        );
        return [...prev, ...uniqueBlogs];
      });
    }
  }, [data, isLoading]);

  useEffect(() => {
    const filterBlogs = setBlogs((prev) =>
      blogs.filter((blog) => blog.id !== prev.id)
    );
    return filterBlogs;
  }, [deletedBlogId]);

  const loadMore = () => {
    if (data) {
      setPage((prev) => {
        if (data?.totalPages > prev) {
          return prev + 1;
        }
      });
    }
  };

  const handleDeleteBlog = (deleteId) => {
    setBlogs((prevBlogs) => {
      // Filter out the deleted blog
      setDeletedBlogId(deleteId);
      return prevBlogs.filter((blog) => blog.id !== deleteId);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[70%] mx-auto flex flex-col gap-16">
      {data?.blogs &&
        blogs?.map((blog) => (
          <BlogCard
            blog={blog}
            key={blog?.id}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
      <div className="flex justify-center items-center flex-col">
        <hr className="w-10 h-[2px] bg-gray-900/50 mx-auto mb-5" />
        {isFetching ? (
          <div className="">
            <Spinner size={"md"} color="red" />
          </div>
        ) : (
          <>
            {data?.totalPages === page ? null : (
              <Button
                text={"See More"}
                bgColor={"bg-black"}
                textColor={"text-white"}
                onclick={loadMore}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
