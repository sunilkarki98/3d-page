import React from "react";

const Navbar = () => {
  return (
    <header className="bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="container ">
        <div className="grid navbar-grid grid-cols-3 items-center py-4">
          {/* Left: Home */}
          <div className="text-left">
            <a href="#home" className="text-white hover:text-gray-900">
              Home
            </a>
          </div>

          {/* Center: Empty */}
          <div className="bg-green-500"></div>

          {/* Right: About Us */}
          <div className="text-right">
            <a href="#about" className="text-white hover:text-gray-900">
              About Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
