import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import { inputHandler } from "../utils/inputHandler";
import { useUpdateProfileMutation } from "../redux/services/api/userApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { uploadImage } from "../utils/firebaseUtil";
import "./lib.css";
import UserEditImageContainer from "../components/user/UserEditImageContainer";

const UserEditModal = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [image, setImage] = useState(null);
  const [userInput, setUserInput] = useState({
    username: user?.username,
    email: user?.email,
    displayName: user?.displayName,
    about: user?.about,
    image: user?.image,
  });

  const { token } = useSelector((state) => state.userStore);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  // for demo => force by instance change
  useEffect(() => {
    const handlerFileChange = async () => {
      if (image) {
        const imageUrl = await uploadImage(image);
        setUserInput((prev) => ({ ...prev, image: imageUrl }));
      }
    };

    handlerFileChange();
  }, [image]);

  const updateUserHandler = async (event) => {
    event.preventDefault();
    const { username, email, displayName, about, image } = userInput;
    try {
      // api request
      const res = await updateProfile({
        token,
        data: { username, email, displayName, about, image },
      });
      const { data, error } = res;

      if (data?.success) {
        Cookies.set("user", JSON.stringify(data?.user));
        close();
        toast.success(data?.message);
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={open}>
        <CiEdit size={20} color="black" />
      </div>
      <Modal opened={opened} onClose={close} title="Update Profile" centered>
        <div className="p-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader size={"md"} color="red" />
            </div>
          ) : (
            <Form onSubmit={updateUserHandler}>
              <div className="flex flex-col mb-4 font-domine text-xs">
                <UserEditImageContainer
                  userInput={userInput}
                  setImage={setImage}
                />
                <Input
                  label={"name"}
                  name={"username"}
                  placeholder={"Name"}
                  value={userInput?.username}
                  inputValue={userInput}
                  setInputValue={setUserInput}
                />
                <Input
                  label={"email"}
                  name={"email"}
                  placeholder={"Email"}
                  value={userInput?.email}
                  inputValue={userInput}
                  setInputValue={setUserInput}
                />
                <Input
                  label={"displayname"}
                  name={"displayName"}
                  placeholder={"Displayname"}
                  value={userInput?.displayName}
                  inputValue={userInput}
                  setInputValue={setUserInput}
                />

                <div className="flex flex-col mb-4 font-domine text-xs">
                  <label
                    className="uppercase text-xs text-gray-700 mb-3"
                    htmlFor={"About"}
                  >
                    {"About"}
                  </label>
                  <textarea
                    name="about"
                    value={userInput?.about}
                    placeholder={"About"}
                    rows={8}
                    onChange={(e) => inputHandler(e, userInput, setUserInput)}
                    className="px-3 py-2 w-full border outline-none"
                  />
                </div>
              </div>
              <Button
                text={"Update"}
                bgColor={"bg-primary"}
                textColor={"text-white"}
                type={"submit"}
              />
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserEditModal;
