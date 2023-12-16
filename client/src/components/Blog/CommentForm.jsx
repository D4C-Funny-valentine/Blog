import React from "react";
import Button from "../ui/Button";

const CommentForm = () => {
  return (
    <div className="w-[70%] mx-auto">
      <form action="" className="flex flex-col gap-8 font-domine text-sm">
        <div className="flex flex-col">
          <label htmlFor="comment" className="mb-4 text-gray-600">
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            rows="10"
            className="w-full resize-none border outline-none p-3"
            placeholder="Type comment"
          />
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-4 text-gray-600">
              Name *
            </label>
            <input
              className="border outline-none px-3 py-2 w-full"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-4 text-gray-600">
              Email *
            </label>
            <input
              className="border outline-none px-3 py-2 w-full"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 text-gray-600">
          <input type="checkbox" id="saveInfo" />
          <label htmlFor="saveInfo">
            Save my name and email in this browser for the next time I comment.
          </label>
        </div>
        <div className="flex">
          <Button
            type={"submit"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
            text={"submit comment"}
          />
        </div>
      </form>
      <div className="flex justify-center items-center pt-20">
        <hr className="w-10 h-[2px] bg-gray-500/50" />
      </div>
    </div>
  );
};

export default CommentForm;
