import React from "react";
import Author from "../components/Blog/Author";
import TitleContainer from "../components/Blog/TitleContainer";
import Header from "../components/ui/Header";
import CommentForm from "../components/Blog/CommentForm";
import Recommend from "../components/Blog/Recommend";
import { useGetSingleBlogQuery } from "../redux/services/api/blogApi";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { dummyData } from "../dummyData/data";
import "../App.css";
import BlogDescription from "../components/Blog/BlogDescription";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(id);

  const dummyDetail = dummyData.blogs[id - 1];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="bg-dusty pb-16 w-full h-full relative">
      <div className="h-full w-full">
        <div className="h-36 w-full bg-primary"></div>

        <div className="w-[65%] mx-auto bg-white -translate-y-24 shadow-lg">
          <div className="px-10 pt-10">
            <Header headerTitle={"Blog Detail"} />
          </div>
          <div className="w-[70%] mx-auto pb-20 h-full">
            <div className="">
              <TitleContainer
                blog={data === undefined ? dummyDetail : data?.blog}
              />
            </div>
            <div className="content tracking-wide leading-8 font-domine mb-6">
              {data === undefined ? (
                dummyDetail?.content
              ) : (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: data?.blog?.content }}
                />
              )}
            </div>
            <BlogDescription blog={data?.blog} />
            <Author userInfo={data?.blog?.userInfo} />
            <div className=" pt-28">
              <Header headerTitle={"Add comment"} />
              <CommentForm />
            </div>
          </div>
        </div>
        <Recommend />
      </div>
    </section>
  );
};

export default BlogDetailPage;
