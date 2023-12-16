import React from "react";
import { CiEdit } from "react-icons/ci";
import "./blog.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteBlogMutation } from "../../redux/services/api/blogApi";
import { toast } from "react-toastify";

const EditAndDeleteButton = ({ blog, position, handleDeleteBlog }) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.userStore);

  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const deleteBlogHandler = async () => {
    try {
      const res = await deleteBlog({ token, id: blog.id });
      const { data, error } = res;
      if (data?.success) {
        toast.success(data?.message);
        handleDeleteBlog(blog.id);
      } else {
        toast.error(error?.data?.message || "An error occurred");
        console.log(error);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
  return (
    <>
      {user !== null &&
        blog?.userInfo &&
        user?.username === blog?.userInfo?.username && (
          <div className={`absolute ${position} duration-200 cursor-pointer`}>
            <div className="relative edit">
              <CiEdit size={28} className="hover:text-primary" />
              <div className={`absolute right-0 edit-box font-domine`}>
                <div className="p-3 w-44 bg-white shadow-md flex flex-col gap-3">
                  <div
                    className="flex gap-2 items-center px-1.5 py-1 duration-200 hover:bg-secondary hover:text-white bg-gray-300"
                    onClick={() =>
                      navigate(`/blog/edit/${blog?.id}`, { state: { blog } })
                    }
                  >
                    <span>Edit</span>
                    <span className="text-xs">icon</span>
                  </div>
                  <button
                    disabled={isLoading}
                    className="flex gap-2 items-center px-1.5 py-1 duration-200 hover:bg-secondary hover:text-white bg-gray-300"
                    onClick={deleteBlogHandler}
                  >
                    <span>Delete</span>
                    <span className="text-xs">icon</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default EditAndDeleteButton;
