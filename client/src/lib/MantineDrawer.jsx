import { Drawer } from "@mantine/core";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import "./lib.css";
import { useUser } from "../hooks/useUser";
import UserEditModal from "./UserEditModal";
import Button from "../components/ui/Button";
import { socialIcons } from "./socialIconData";
import { useLogoutMutation } from "../redux/services/api/userApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/services/slices/userStoreSlice";
import { useEffect } from "react";

const MantineDrawer = ({ opened, close }) => {
  const { user } = useUser();

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userStore);

  const logoutHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await logout(token);
      const { data, error } = res;
      if (data?.success) {
        dispatch(removeUser());
        close();
        toast.success(data.message);
      } else {
        toast.error(error.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      position="right"
      transitionProps={{ duration: 300, timingFunction: "linear" }}
    >
      <div className="w-full h-full">
        <div className="py-8 px-14 flex items-center justify-between bg-primary text-white">
          <Link to={"/"} onClick={() => close()} className="outline-none">
            <h3 className="text-3xl font-semibold">topology</h3>
          </Link>
          <button
            className="cursor-pointer p-1 bg-white rounded-sm"
            onClick={() => close()}
          >
            <RxCross2 size={18} className="text-primary" strokeWidth={2} />
          </button>
        </div>

        {
          <div className="flex flex-col gap-14 h-[85%] w-[68%] mx-auto pt-24">
            <div className="author mb-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 mb-4">
                  <span className="uppercase text-xl font-semibold">
                    {user?.username}{" "}
                  </span>
                  {user?.displayName && (
                    <span className="text-xs border border-b pb-1">
                      Display Name : {`(${user?.displayName})`}
                    </span>
                  )}
                </div>
                <UserEditModal user={user} />
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden float-left mr-5 mt-2">
                {user?.image ? (
                  <img src={user.image} alt="" />
                ) : (
                  <img
                    src="https://i.pinimg.com/236x/01/3a/3d/013a3dd5a48731cbef7acf195774a9c1.jpg"
                    alt=""
                    className="object-cover"
                  />
                )}
              </div>
              {user?.about ? (
                <p className="font-domine text-sm text-gray-600 pr-5 leading-6">
                  {user?.about}{" "}
                </p>
              ) : (
                <p className="font-domine text-sm text-gray-600 pr-5 leading-6">
                  I get my inspiration from the fictional world. I'm a social
                  geek. Completely exploit 24/365 catalysts for change whereas
                  high standards in action items. Conveniently whiteboard
                  multifunctional benefits without enabled leadership.
                </p>
              )}
            </div>
            <div className="">
              <h3 className="uppercase text-xl font-semibold mb-4">
                Get in touch
              </h3>
              <p className="font-domine text-sm text-gray-600 pr-5 leading-6 mb-4">
                Quickly communicate covalent niche markets for maintainable
                sources. Collaboratively harness resource sucking experiences
                whereas cost effective meta-services.
              </p>
              <div className="flex items-center gap-4">
                {socialIcons.map((item) => (
                  <button
                    key={item.name}
                    disabled={true}
                    className={`${item.bg} p-3 rounded-full cursor-pointer`}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <div className="">
                <Button
                  bgColor={"bg-primary"}
                  text={"Logout"}
                  textColor={"text-white"}
                  icon={<FiLogOut size={18} color="white" />}
                  onclick={logoutHandler}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </Drawer>
  );
};

export default MantineDrawer;
