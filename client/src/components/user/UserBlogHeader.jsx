import React from "react";
import Header from "../ui/Header";

const UserBlogHeader = ({ user }) => {
  const defaultImageUrl =
    "https://i.pinimg.com/236x/62/92/bc/6292bc7fc135d814017a6cab4336c1d8.jpg";
  return (
    <div className="mb-36">
      <div className="flex flex-col justify-center items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-12">
          <img
            src={user?.image ? user?.image : defaultImageUrl}
            alt=""
            className="object-cover"
          />
        </div>
        <Header headerTitle={`Author : ${user?.username}`} />
        <p className="text-center font-domine text-gray-600 w-2/3">
          {user?.about}
        </p>
      </div>
    </div>
  );
};

export default UserBlogHeader;
