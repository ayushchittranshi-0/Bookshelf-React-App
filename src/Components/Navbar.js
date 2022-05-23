import React, { Fragment } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({
  isLogin,
  setIsLogin,
  setLoginDbKey,
  setUserEmail,
  username,
  setUsername,
  setBookInput,
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
        <div className="container">
          <div className="username-container">
            {isLogin && (
              <div className="divUsername">
                <p>Hello, {username}</p>
              </div>
            )}
          </div>
          <ul className="navbarLinkList">
            <li>
              <NavLink to="/searchbooks" className="navbarLink">
                SearchBooks
              </NavLink>
            </li>
            {isLogin && (
              <li>
                <NavLink to="/userlibrary" className="navbarLink">
                  Library
                </NavLink>
              </li>
            )}
            {!isLogin && (
              <li>
                <NavLink to="/login" className="navbarLink">
                  Login/Signup
                </NavLink>
              </li>
            )}
            {isLogin && (
              <li>
                <button
                  className="navbarLink navbarLinkButton"
                  onClick={() => {
                    setIsLogin(false);
                    setLoginDbKey("");
                    setUserEmail("");
                    setUsername("");
                    localStorage.removeItem("email");
                    setBookInput("");
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
