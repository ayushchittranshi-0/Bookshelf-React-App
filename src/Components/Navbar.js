import React, { Fragment } from "react";
import "./NavBar.css";
import LoginPage from "./Pages/LoginPage.js";

const Navbar = ({ setLoginstate }) => {
  const loginClickHandler = () => {
    //Do something
    console.log(setLoginstate);
  };

  return (
    <Fragment>
      <header>
        <a href="#">
          <img
            src="https://cdn.pixabay.com/photo/2019/06/13/07/23/black-and-white-4270982__340.png"
            alt="logo"
          />
          THE BOOKSHELF
        </a>
        {/* add router and change login state */}
        <button onClick={loginClickHandler}>Login</button>
      </header>
      <LoginPage></LoginPage>
    </Fragment>
  );
};

export default Navbar;
