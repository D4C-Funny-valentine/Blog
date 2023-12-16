import React from "react";
import { useModal } from "../../hooks/useModal";
import { HiMiniBars3 } from "react-icons/hi2";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavButton = ({ onClick, text }) => {
  return (
    <button className="py-2.5 px-2" onClick={onClick}>
      <span className="text-xs uppercase">{text}</span>
    </button>
  );
};

const NavbarLinks = ({ open }) => {
  const { openModalHandler } = useModal();
  const { token } = useSelector((state) => state.userStore);

  const navigate = useNavigate();

  return (
    <div className="flex gap-8 items-center">
      {token && <NavButton onClick={() => navigate("/")} text={"home"} />}
      <Link to={"/blog"} className="py-2.5 px-2">
        <span className="text-xs uppercase">BLOG</span>
      </Link>
      {token ? (
        <NavButton
          text={"most read"}
          onClick={() => navigate("/blog/most-read")}
        />
      ) : (
        <NavButton onClick={() => openModalHandler("signIn")} text={"signin"} />
      )}
      {token ? (
        <NavButton text={"latest"} onClick={() => navigate("/blog/latest")} />
      ) : (
        <NavButton onClick={() => openModalHandler("signUp")} text={"signup"} />
      )}
      {token && (
        <NavButton
          onClick={() => navigate("/blog/create")}
          text={"create blog"}
        />
      )}
      {token && (
        <NavButton
          onClick={() => navigate("/blog/user/favorite")}
          text={"favorite blog"}
        />
      )}
      {token ? (
        <button
          className="p-2 hover:bg-secondary hover:shadow-lg"
          onClick={() => open()}
        >
          <span className="text-xs ">
            <HiMiniBars3 size={20} />
          </span>
        </button>
      ) : (
        <Button
          bgColor={"bg-white"}
          textColor={"text-primary"}
          text={"GET STARTED"}
          onclick={() => openModalHandler("signIn")}
        />
      )}
    </div>
  );
};

export default NavbarLinks;
