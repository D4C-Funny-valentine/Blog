import React from "react";

const Header = ({ headerTitle }) => {
  return (
    <div className="mb-12">
      <h3 className="uppercase text-center mt-2 mb-5 font-medium">
        {headerTitle}
      </h3>
      <hr className="w-10 h-[2px] bg-gray-900/30 mx-auto" />
    </div>
  );
};

export default Header;
