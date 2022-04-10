import React, { Fragment } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({ setLoginstate }) => {
  const loginClickHandler = () => {
    //Do something
    console.log(setLoginstate);
  };

  return (
    <Fragment>
      <header>
        <Link to="/" className="logo">
          <img
            src="https://cdn.pixabay.com/photo/2019/06/13/07/23/black-and-white-4270982__340.png"
            alt="logo"
          />
          THE BOOKSHELF
        </Link>
        <NavLink to="/login" className="navbarLink">
          Login/Signup
        </NavLink>
      </header>
    </Fragment>
  );
};

export default Navbar;
