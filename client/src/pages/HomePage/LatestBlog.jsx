import React, { useState } from "react";
import Header from "../../components/ui/Header";
import CardContainer from "../../components/Blog/CardContainer";
import { useGetLatestBlogQuery } from "../../redux/services/api/blogApi";

const LatestBlog = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetLatestBlogQuery(page);
  return (
    <div className="w-full h-full p-10">
      <Header headerTitle={"Latest Stories"} />
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

export default LatestBlog;
