import React, { useState } from "react";
import Header from "../components/ui/Header";
import CardContainer from "../components/Blog/CardContainer";
import { useGetMostReadBlogQuery } from "../redux/services/api/blogApi";

const MostReadBlogPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetMostReadBlogQuery(page);
  return (
    <section className="bg-dusty pb-16 w-full h-full relative">
      <div className="h-full w-full">
        <div className="h-36 w-full bg-primary"></div>
        <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg p-10">
          <Header headerTitle={"Most Read"} />
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

export default MostReadBlogPage;
