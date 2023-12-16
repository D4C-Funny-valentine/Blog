import React from "react";
import EditForm from "../components/Blog/EditForm";

const EditBlog = () => {
  return (
    <div className="w-full min-h-screen bg-dusty">
      <div className="h-36 bg-primary w-full"></div>
      <div className="w-[65%] mx-auto bg-white -translate-y-24">
        <div className="w-[70%] mx-auto p-10">
          <EditForm />
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
