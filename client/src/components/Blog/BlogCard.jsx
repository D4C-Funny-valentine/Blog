import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { formatDate } from "../../utils/autoDateChange";
import { CiBookmarkPlus } from "react-icons/ci";
import "./blog.css";
import EditAndDeleteButton from "./EditAndDeleteButton";
import {
  useCreateUserFavoriteMutation,
  useDeleteUserFavoriteMutation,
  useGetUserFavoritesQuery,
} from "../../redux/services/api/favoriteApi";
import { useSelector } from "react-redux";

const BlogCard = ({ blog, handleDeleteBlog }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { token } = useSelector((state) => state.userStore);
  const [createUserFavorite, { isLoading: createLoading }] =
    useCreateUserFavoriteMutation();
  const [deleteUserFavorite, { isLoading: deleteLoading }] =
    useDeleteUserFavoriteMutation();

  const addFavoriteBlogHandler = async () => {
    try {
      const res = await createUserFavorite({ token, id: blog.id });
      const { data, error } = res;
      console.log(data, error);
      if (data?.success) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const removeFavoriteBlogHandler = async () => {
    try {
      const res = await deleteUserFavorite({ token, id: blog.id });
      const { data, error } = res;
      if (data?.success) {
        setIsFavorite(false);
      }
      console.log(data, error);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-4 relative" key={blog.id}>
      <div className="relative">
        <h3 className="text-5xl font-semibold uppercase w-4/5 mb-4 hover:text-primary duration-300">
          {blog?.title}
        </h3>
        <div className="font-domine flex gap-2 text-gray-600 text-xs">
          <p>By {blog?.userInfo?.username} </p>
          {blog?.createdAt && <p> / {formatDate(blog?.createdAt)}</p>}
        </div>
        <div className="absolute -top-20 -left-24">
          <h1 className="uppercase text-[14rem] font-semibold text-gray-400/30">
            {blog?.title[0]}
          </h1>
        </div>
      </div>
      <div className="">
        <div className="line-clamp-4 text-gray-600 font-domine leading-9">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to={`/blog/detail/${blog.id}`}>
          <Button
            text={"read on"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
          />
        </Link>

        <Button
          text={isFavorite ? "Remove favorite" : "Read Later"}
          icon={<CiBookmarkPlus size={14} className="text-primary" />}
          bgColor={"bg-transparent"}
          textColor={"text-primary"}
          borderColor={"border-primary"}
          disabled={createLoading || (deleteLoading && true)}
          onclick={() =>
            isFavorite ? removeFavoriteBlogHandler() : addFavoriteBlogHandler()
          }
        />
      </div>
      <EditAndDeleteButton
        blog={blog}
        position={"top-0 right-0"}
        handleDeleteBlog={handleDeleteBlog}
      />
    </div>
  );
};

export default BlogCard;
