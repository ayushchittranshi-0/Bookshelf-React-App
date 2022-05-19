import React, { useEffect, useState } from "react";
import "./LoginSignupPage.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../Components/Helpers/Regex.js";
import redImg from "../../Images/icons8-red-circle-48.png";
import greenImg from "../../Images/icons8-green-circle-48.png";

const LoginPage = ({ setUserEmail, setIsLogin, isLogin }) => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const WEB_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const [submitValid, setSubmitValid] = useState(false);
  const [successState, setSuccessState] = useState("loginSignup");

  const inputValidation = () => {
    let inputTimeout = setTimeout(() => {
      if (loginState.email) {
        if (!emailValidation(loginState.email))
          setError((prevState) => prevState + " Email is invalid. ");
      }
      if (loginState.password) {
        if (!passwordValidation(loginState.password))
          setError((prevState) => prevState + " Password is invalid. ");
      }
    }, 500);

    return () => {
      clearTimeout(inputTimeout);
      setError("");
    };
  };

  useEffect(inputValidation, [loginState]);

  useEffect(() => {
    if (loginState.email && loginState.password && !error) {
      setSubmitValid(true);
    }
    return () => {
      setSubmitValid(false);
    };
  }, [error, loginState]);

  const emailInputHandler = (e) => {
    setLoginState({ ...loginState, email: e.target.value });
  };

  const passwordInputHandler = (e) => {
    setLoginState({ ...loginState, password: e.target.value });
  };

  const LoginSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        WEB_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          email: loginState.email,
          password: loginState.password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    response.ok && setSuccessState("loginSignup success");
    !response.ok && setSuccessState("loginSignup fail");
    response.ok && setUserEmail(loginState.email);
    response.ok && setIsLogin(true);
    response.ok && localStorage.setItem("email", loginState.email);
    response.ok && setLoginState({ email: "", password: "" });
    response.ok && navigate("/userlibrary");
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessState("loginSignup");
    }, 3000);
  }, [successState]);

  return (
    <form onSubmit={LoginSubmitHandler}>
      <Card className="form-container">
        <div className={successState}>
          <img
            src={successState === "loginSignup success" ? greenImg : redImg}
            alt="red/green circle"
          />
          <h2>
            {successState === "loginSignup success"
              ? "Login Successful"
              : successState === "loginSignup fail"
              ? "Something went wrong"
              : "Status Unknown"}{" "}
          </h2>
        </div>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={emailInputHandler}
          value={loginState.email}
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          onChange={passwordInputHandler}
          value={loginState.password}
        ></input>
        <button disabled={!submitValid}>Submit</button>
        {error && <span className="error">{error}</span>}
        <p>
          New User? Click to{" "}
          <span
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Signup
          </span>
        </p>
      </Card>
    </form>
  );
};

export default LoginPage;
