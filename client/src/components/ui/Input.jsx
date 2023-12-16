import React from "react";
import { inputHandler } from "../../utils/inputHandler";

const Input = ({
  label,
  inputValue,
  value,
  setInputValue,
  name,
  placeholder,
  required,
  type = "text",
}) => {
  return (
    <div className="flex flex-col mb-4 font-domine text-xs">
      <label className="uppercase text-xs text-gray-700 mb-3" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => inputHandler(e, inputValue, setInputValue)}
        className="px-3 py-2 w-full border outline-none"
        required={required}
      />
    </div>
  );
};

export default Input;
