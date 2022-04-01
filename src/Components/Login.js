import React, { useEffect } from "react";
import { Fragment, useState } from "react";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const [loginIsValid, setLoginIsValid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedin") === "1") {
      setShowLogin(false);
    }
  }, []);

  useEffect(() => {
    let validtionTimer = setTimeout(() => {
      if (
        loginData.userName.length < 5 ||
        loginData.password.length < 6 ||
        loginData.userName.includes(" ")
      )
        setLoginIsValid(false);
      else setLoginIsValid(true);
    }, 500);
    return () => {
      clearTimeout(validtionTimer);
    };
  }, [loginData]);

  const loginFormHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedin", 1);
    setShowLogin(false);
  };

  let disp = showLogin ? (
    <Fragment>
      <form /*className="form-inline"*/ onSubmit={loginFormHandler}>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          onChange={(e) => {
            setLoginData({
              password: loginData.password,
              userName: e.target.value,
            });
          }}
          value={loginData.userName}
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setLoginData({
              password: e.target.value,
              userName: loginData.userName,
            });
          }}
          value={loginData.password}
        ></input>

        <button disabled={!loginIsValid}>Submit</button>
      </form>
    </Fragment>
  ) : (
    <Fragment>
      <p>Hello Ayush Chittranshi</p>
      <button
        onClick={() => {
          setShowLogin(true);
          localStorage.setItem("isLoggedin", 0);
          setLoginIsValid(false);
        }}
      >
        Logout
      </button>
    </Fragment>
  );

  return disp;
};

export default Login;
