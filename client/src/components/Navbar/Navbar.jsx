import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

const Navbar = ({ open }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scroll = useCallback(() => {
    if (window.scrollY > 900) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  const navbarClass = isScrolled ? "fixed top-0" : "";

  return (
    <nav className={`h-20 bg-primary text-white w-full ${navbarClass} z-30`}>
      <div className="flex h-full items-center justify-between w-[65%] mx-auto">
        <Link to={"/"} className="outline-none">
          <h3 className="text-2xl font-bold">topology</h3>
        </Link>
        <NavbarLinks open={open} />
      </div>
    </nav>
  );
};

export default Navbar;
