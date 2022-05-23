import React, { Fragment } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="showcase">
      {" "}
      <div className="container">
        <div className="showcase-content">
          <h1 className="homeHeading">
            Welcome to <span className="text-primary">The Bookshelf</span>
          </h1>
          <p className="homeText">
            Signup and Login to start organizing your reading life. Enjoy!
            <br />
            <br />
            <br />
            <button
              className="homepage-button"
              onClick={
                isLogin
                  ? () => {
                      navigate("/userlibrary");
                    }
                  : () => {
                      navigate("/login");
                    }
              }
            >
              {" "}
              Go to BookShelf{" "}
            </button>
            <br />
            <br />
            <br />
            <span className="footer">
              For quick testing you can login with the following credentials.{" "}
              <br />
              Email- test@bookshelf.com <br />
              Password- test1234
            </span>
          </p>
        </div>
        {/* <img className="backgroundImg" src={backgroundImg} alt="book" /> */}
      </div>
    </div>
  );
};

export default HomePage;
