import React, { useRef } from "react";
import { CiEdit } from "react-icons/ci";

const UserEditImageContainer = ({ userInput, setImage }) => {
  const fileRef = useRef(null);
  const defaultImageUrl =
    "https://i.pinimg.com/236x/62/92/bc/6292bc7fc135d814017a6cab4336c1d8.jpg";
  return (
    <div className="w-28 h-28 overflow-hidden rounded-full mb-4 mx-auto flex justify-center items-center relative image-container">
      <img
        src={userInput?.image ? userInput?.image : defaultImageUrl}
        alt=""
        className="object-cover"
      />
      <div className="absolute w-full image-edit-box -bottom-7 left-[50%] right-0 -translate-x-[50%] flex justify-center items-center">
        <div className="flex justify-center items-center w-full mx-auto px-3 pb-3 bg-black/70">
          <CiEdit
            color="white"
            size={24}
            className="mb-5 cursor-pointer"
            onClick={() => fileRef.current.click()}
            strokeWidth={0.5}
          />
        </div>
      </div>
      <div className="flex flex-col mb-4 font-domine text-xs">
        <input
          type="file"
          id="Image"
          ref={fileRef}
          name="image"
          accept="image/*"
          placeholder="Profile Image"
          onChange={(e) => setImage(e.target.files[0])}
          className="px-3 py-2 w-full border outline-none hidden"
        />
      </div>
    </div>
  );
};

export default UserEditImageContainer;
