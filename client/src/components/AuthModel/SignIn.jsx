import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import { useSignInMutation } from "../../redux/services/api/userApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/services/slices/userStoreSlice";

const SignIn = () => {
  const location = useLocation();
  const { closeModalHandler, openModalHandler } = useModal();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading, isError }] = useSignInMutation();

  const signInHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await signIn(userInput);
      const { data, error } = res;
      console.log(data, error);
      if (data?.success) {
        dispatch(addUser({ token: data?.token, user: data?.user }));
        closeModalHandler();
        navigate(`${location.pathname}`);
        toast.success(data?.message);
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="uppercase text-lg font-bold mb-4">sign in</h3>
        <button
          onClick={() => {
            navigate(
              `${
                location.pathname === "/blog/create" ? "/" : location.pathname
              }`
            );
            closeModalHandler();
          }}
        >
          <RxCross2 size={18} />
        </button>
      </div>
      <Form onSubmit={signInHandler}>
        <div className="flex flex-col mb-4 font-domine text-xs">
          <Input
            label={"email"}
            name={"email"}
            placeholder={"Email"}
            value={userInput.email}
            inputValue={userInput}
            type="email"
            setInputValue={setUserInput}
          />
          <Input
            label={"password"}
            name={"password"}
            placeholder={"password"}
            value={userInput.password}
            inputValue={userInput}
            setInputValue={setUserInput}
            type="password"
          />
        </div>
        <Button
          text={"Sign In"}
          bgColor={"bg-primary"}
          textColor={"text-white"}
          type={"submit"}
        />
      </Form>
      <div className="flex gap-4 mt-4">
        <h3 className="text-gray-600">Don't have an account?</h3>

        <button
          className="text-primary"
          onClick={() => openModalHandler("signUp")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
