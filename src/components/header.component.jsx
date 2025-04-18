import React from "react";
import "../index.css";

function Header() {

  return (
    <header className="container flex justify-between shadow-md md:shadow-none h-20 ">
      <img
        className="md:hidden lg:inline-flex"
        src="./images/logo-full.svg"
        alt=""
        width="180"
      />
      <img
        className="hidden md:inline-block lg:hidden"
        src="./images/logo.svg"
        alt=""
        width="45"
      />
      <div className="flex items-center">

        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          <div className="hidden max-w-xl md:grid gap-4 grid-cols-4 text-right">
            <p className="nav-item">Home</p>
            <p className="nav-item">Product</p> 
            <p className="nav-item">Pricing</p> 
            <p className="nav-item">About Us</p> 
          </div>

          <button className="secondary-button rounded-full">Sign in</button>
          {/* <button className="primary-button">Sign up</button> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
