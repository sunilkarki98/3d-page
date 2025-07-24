import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gray-100 shadow">
      <div className="container ">
        <div className="grid navbar-grid grid-cols-3 items-center py-4">
          {/* Left: Home */}
          <div className="text-left">
            <a href="#home" className="text-gray-700 hover:text-gray-900">
              Home
            </a>
          </div>

          {/* Center: Empty */}
          <div className="bg-green-500"></div>

          {/* Right: About Us */}
          <div className="text-right">
            <a href="#about" className="text-gray-700 hover:text-gray-900">
              About Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
