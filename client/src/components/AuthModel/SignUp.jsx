import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import { useSignUpMutation } from "../../redux/services/api/userApi";
import { inputHandler } from "../../utils/inputHandler";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/services/slices/userStoreSlice";

const SignUp = () => {
  const location = useLocation();
  const { closeModalHandler, openModalHandler } = useModal();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await signUp(userInput);
      const { data, error } = res;
      if (data?.success) {
        dispatch(addUser({ token: data?.token, user: data?.user }));
        closeModalHandler();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-10 w-10">
        loading...
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="uppercase text-lg font-bold mb-4">sign up</h3>
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
      <Form onSubmit={signUpHandler}>
        <div className="flex flex-col mb-4 font-domine text-xs">
          <Input
            label={"name"}
            name={"username"}
            placeholder={"Name"}
            value={userInput.username}
            inputValue={userInput}
            setInputValue={setUserInput}
          />
          <Input
            label={"email"}
            name={"email"}
            placeholder={"Email"}
            value={userInput.email}
            inputValue={userInput}
            setInputValue={setUserInput}
          />
          <Input
            label={"password"}
            name={"password"}
            placeholder={"Password"}
            value={userInput.password}
            inputValue={userInput}
            setInputValue={setUserInput}
            type="password"
          />
          <Input
            label={"password confirmation"}
            name={"passwordConfirmation"}
            placeholder={"Password Confirmation"}
            value={userInput.passwordConfirmation}
            inputValue={userInput}
            setInputValue={setUserInput}
            type="password"
          />
        </div>
        <Button
          text={"Sign Up"}
          bgColor={"bg-primary"}
          textColor={"text-white"}
          type={"submit"}
        />
      </Form>
      <div className="flex gap-4 mt-4">
        <h3 className="text-gray-600">Already have an account?</h3>
        <button
          className="text-primary"
          onClick={() => openModalHandler("signIn")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
