import React from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Model = () => {
  const model = useSelector((state) => state.model);
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-dusty z-[400] flex justify-center items-center overflow-hidden">
      <div className="w-1/4 bg-white shadow-lg  p-10">
        {model.type === "signIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Model;
