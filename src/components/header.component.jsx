import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../App'

function Header({ children, cart }) {


  let { userAuth: { access_token }, setuserAuth } = useContext(UserContext);



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
            <Link to="/">
              <p className="nav-item">Home</p>
            </Link>
            <Link to="/products">
              <p className="nav-item">Product</p>
            </Link>
            <Link to="/">
              <p className="nav-item">Pricing</p>
            </Link>
            <Link to="/">
              <p className="nav-item">About Us</p>
            </Link>
          </div>
          {
            access_token ?
              <Link to="/pathwheel">
                <button className="secondary-button rounded-full">Pathwheel</button>
              </Link>
              :
              <Link to="/signin">
                <button className="secondary-button rounded-full">Sign in</button>
              </Link>
          }

          {
            cart ?? null
          }

          {/* <Link to="/signin">
          <button className="secondary-button rounded-full">Sign in</button>
            <button className="primary-button">Sign up</button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
