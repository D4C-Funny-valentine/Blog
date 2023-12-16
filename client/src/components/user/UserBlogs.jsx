import React, { useState } from "react";
import UserBlogHeader from "./UserBlogHeader";
import { useUserBlogsQuery } from "../../redux/services/api/userApi";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CardContainer from "../Blog/CardContainer";

const UserBlogs = () => {
  const { token } = useSelector((state) => state.userStore);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useUserBlogsQuery({
    token,
    id: id,
    page,
  });
  if (error) {
    return (
      <div className="w-full h-screen p-10 flex justify-center items-center"></div>
    );
  }
  return (
    <div className="w-full h-full p-10">
      <UserBlogHeader user={data?.author} />
      <CardContainer
        page={page}
        setPage={setPage}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
};

export default UserBlogs;
