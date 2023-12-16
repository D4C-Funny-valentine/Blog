import React from "react";

const BlogDescription = ({ blog }) => {
  return (
    <div className="flex items-center gap-4 font-domine select-box mt-10">
      {blog?.description.length > 0 &&
        blog?.description?.map((item) => (
          <div
            className="text-xs px-4 py-1 bg-gray-200 text-gray-700"
            key={item}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default BlogDescription;
