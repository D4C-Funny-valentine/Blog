import React from "react";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const defaultImageUrl =
  "https://i.pinimg.com/236x/62/92/bc/6292bc7fc135d814017a6cab4336c1d8.jpg";
const Author = ({ userInfo }) => {
  const { token } = useSelector((state) => state.userStore);
  const { autoOpenModalHandlerWhenNoToken } = useModal();

  const navigate = useNavigate();

  const viewAllPostsHandler = () => {
    if (token) {
      userInfo && navigate(`/user/${userInfo?._id}/blogs`, { state: userInfo });
    } else {
      autoOpenModalHandlerWhenNoToken(token);
    }
  };

  return (
    <div className="author mt-20">
      <Header headerTitle={"About the author"} />
      <div className="flex gap-6">
        <div className="">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src={userInfo?.image ? userInfo?.image : defaultImageUrl}
              alt=""
              className="object-cover"
            />
          </div>
        </div>
        <div className="">
          <h2 className="text-lg uppercase mb-4">{userInfo?.username}</h2>
          {userInfo?.about ? (
            <p className="about font-domine leading-8 text-gray-700 mb-4 w-4/5">
              {userInfo?.about}
            </p>
          ) : (
            <p className="about font-domine leading-8 text-gray-700 mb-4 w-4/5">
              I get my inspiration from the fictional world. I'm a social geek.
              Completely exploit 24/365 catalysts for change whereas high
              standards in action items. Conveniently whiteboard multifunctional
              benefits without enabled leadership.
            </p>
          )}
          <Button
            text={"view all posts"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
            onclick={viewAllPostsHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Author;
