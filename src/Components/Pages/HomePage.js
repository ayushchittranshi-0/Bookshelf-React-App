import React, { Fragment } from "react";
import backgroundImg from "../../Images/asal-lotfi-8ePZbdxnpi0-unsplash.jpg";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="imageDiv">
      <h1 className="homeHeading">Welcome to The Bookshelf</h1>
      <span className="homeText">
        This is demo app based on React Js.
        <br /> Signup and Login to start organizing your reading life. Enjoy!
        <br />
        <br />
        For quick testing you can login with the following credentials. <br />
        Email- test@bookshelf.com <br />
        Password- test1234
      </span>
      <img className="backgroundImg" src={backgroundImg} alt="book" />
    </div>
  );
};

export default HomePage;
