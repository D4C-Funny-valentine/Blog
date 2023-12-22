import React, { useState } from "react";
import Header from "../components/ui/Header";
import { useGetUserFavoritesQuery } from "../redux/services/api/favoriteApi";
import { useSelector } from "react-redux";
import CardContainer from "../components/Blog/CardContainer";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useGetAllBlogQuery } from "../redux/services/api/blogApi";

const FavoriteBlogPage = () => {
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.userStore);
  const { data, error, isLoading, isFetching } = useGetUserFavoritesQuery({
    token,
    page,
  });

  console.log(data);

  const navigate = useNavigate();
  if (error) {
    return (
      <div className="h-[70vh]">
        <div className="flex flex-col justify-center items-center gap-6 h-full">
          <h3 className="text-5xl font-semibold mb-4">
            Oops! No favorite blogs yet.
          </h3>
          <p className="mb-3 font-domine text-lg">
            Looks like you haven't added any favorites. Why not add your top
            picks now?
          </p>
          <Button
            bgColor={"bg-primary"}
            text={"Explore Blogs"}
            textColor={"text-white"}
            onclick={() => navigate("/blog")}
          />
        </div>
      </div>
    );
  }

  if (data)
    return (
      <section className="bg-dusty pb-16 w-full h-full relative">
        <div className="h-full w-full">
          <div className="h-36 w-full bg-primary"></div>
          <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg p-10">
            <Header headerTitle={"Favorite Blog"} />
            <CardContainer
              isLoading={isLoading}
              isFetching={isFetching}
              data={data}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </section>
    );
};

export default FavoriteBlogPage;
