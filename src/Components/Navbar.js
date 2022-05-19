import React, { Fragment } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({
  userEmail,
  isLogin,
  setIsLogin,
  setLoginDbKey,
  setUserEmail,
}) => {
  const loginClickHandler = () => {
    // userlibrary;
    //Do something
    // console.log(setLoginstate);
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
        <NavLink to="/searchbooks" className="navbarLink">
          SearchBooks
        </NavLink>

        {isLogin && (
          <NavLink to="/userlibrary" className="navbarLink">
            User Library
          </NavLink>
        )}
        {!isLogin && (
          <NavLink to="/login" className="navbarLink">
            Login/Signup
          </NavLink>
        )}
        {isLogin && (
          <button
            className="navbarLink"
            onClick={() => {
              setIsLogin(false);
              setLoginDbKey("");
              setUserEmail("");
              localStorage.removeItem("email");
            }}
          >
            Logout
          </button>
        )}
        {isLogin && <p>Hello {userEmail}</p>}
      </header>
    </Fragment>
  );
};

export default Navbar;
