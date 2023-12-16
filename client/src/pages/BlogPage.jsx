import React, { useState } from "react";
import { useGetAllBlogQuery } from "../redux/services/api/blogApi";
import Header from "../components/ui/Header";
import CardContainer from "../components/Blog/CardContainer";

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetAllBlogQuery(page);
  return (
    <section className="bg-dusty pb-16 w-full h-full relative">
      <div className="h-full w-full">
        <div className="h-36 w-full bg-primary"></div>
        <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg p-10">
          <Header headerTitle={"Blog"} />
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

export default BlogPage;
