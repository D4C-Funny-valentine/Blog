import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dusty h-60 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full">
        <h3 className="text-3xl font-semibold text-gray-400/90">topology</h3>
        <p className="text-gray-400/90">
          Created by
          <strong className="text-gray-600 border-b border-gray-600 ml-2">
            Meks
          </strong>
          . Powered by
          <strong className="text-gray-600 border-b border-gray-600 ml-2">
            React
          </strong>
        </p>
        <p className="text-gray-400/90">All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
