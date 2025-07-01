import React from "react";
import logoImage from "./logo.avif";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src={logoImage} alt="Company logo" className="w-10 h-auto" />
          </Link>
          <div className="hidden lg:block font-bold">
            <Link  to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/login" className="hover:text-darkBlue">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

