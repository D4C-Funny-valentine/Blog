import React from "react";

const Button = ({
  onclick,
  text,
  bgColor,
  borderColor,
  textColor,
  icon,
  type,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-6 py-2.5 border flex justify-center items-center duration-200 active:scale-95 gap-2 ${bgColor} ${borderColor} font-semibold hover:shadow-lg font-josefin ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }`}
      onClick={onclick}
    >
      {icon}
      <span className={`text-xs uppercase ${textColor}`}>{text}</span>
    </button>
  );
};

export default Button;
