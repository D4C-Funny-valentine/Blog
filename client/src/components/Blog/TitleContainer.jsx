import React from "react";
import { useSelector } from "react-redux";
import EditAndDeleteButton from "./EditAndDeleteButton";
import { useDeleteBlogMutation } from "../../redux/services/api/blogApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TitleContainer = ({ blog }) => {
  const { token, user } = useSelector((state) => state.userStore);

  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const deleteBlogHandler = async () => {
    try {
      const response = await deleteBlog({ token, id: blog.id });
      const { data, error } = response;
      if (data?.success) {
        navigate("/blog");
        toast.success(data.message);
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-container flex flex-col gap-6">
      <div className="relative header">
        <div className="flex items-center">
          <h1 className="text-[16rem] uppercase font-semibold text-gray-400/30 -translate-x-24">
            {blog?.title[0]}
          </h1>
          <h3 className="uppercase font-semibold text-5xl mb-4 w-4/5 -translate-x-[10.5rem]">
            {blog?.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600/70 -translate-y-20 font-domine text-sm">
          <p>
            By <strong className="text-gray-500/80">Mark Danek</strong>
          </p>
          <p>
            {" "}
            / Read <strong className="text-gray-500/80">3 min</strong>
          </p>
        </div>
        <EditAndDeleteButton
          blog={blog}
          user={user}
          position={"top-20 right-0"}
          onClick={deleteBlogHandler}
        />
      </div>
    </div>
  );
};

export default TitleContainer;
