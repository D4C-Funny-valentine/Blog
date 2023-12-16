import React from "react";

const Form = ({ onSubmit, children }) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
