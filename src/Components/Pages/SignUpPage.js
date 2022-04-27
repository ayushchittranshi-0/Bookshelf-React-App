import React, { useEffect, useState } from "react";
import "./LoginSignupPage.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../../Components/Helpers/Regex.js";

const SignUpPage = () => {
  const [signUpState, setSignUpState] = useState({
    email: null,
    username: null,
    password: null,
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const WEB_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const [submitValid, setSubmitValid] = useState(false);
  const [successState, setSuccessState] = useState("loginSignup");

  const inputValidation = () => {
    let inputTimeout = setTimeout(() => {
      if (signUpState.username) {
        if (!usernameValidation(signUpState.username))
          setError((prevState) => prevState + " Username is invalid. ");
      }
      if (signUpState.email) {
        if (!emailValidation(signUpState.email))
          setError((prevState) => prevState + " Email is invalid. ");
      }
      if (signUpState.password) {
        if (!passwordValidation(signUpState.password))
          setError((prevState) => prevState + " Password is invalid. ");
      }
    }, 500);

    return () => {
      clearTimeout(inputTimeout);
      setError("");
    };
  };

  useEffect(inputValidation, [signUpState]);

  useEffect(() => {
    if (
      signUpState.email &&
      signUpState.username &&
      signUpState.password &&
      !error
    ) {
      setSubmitValid(true);
    }
    return () => {
      setSubmitValid(false);
    };
  }, [error, signUpState]);

  const emailInputHandler = (e) => {
    setSignUpState({ ...signUpState, email: e.target.value });
  };

  const usernameInputHandler = (e) => {
    setSignUpState({ ...signUpState, username: e.target.value });
  };

  const passwordInputHandler = (e) => {
    setSignUpState({ ...signUpState, password: e.target.value });
  };

  const SignupSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        WEB_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          email: signUpState.email,
          password: signUpState.password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.ok);
    response.ok && setSuccessState("loginSignup success");
    !response.ok && setSuccessState("loginSignup fail");
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessState("loginSignup");
    }, 3000);
  }, [successState]);

  return (
    <form onSubmit={SignupSubmitHandler}>
      <Card className="form-container">
        <h2 className={successState}>
          {successState === "loginSignup success"
            ? "Signup Successful"
            : "Hello"}
          {successState === "loginSignup fail" ? "Something went wrong" : ""}
        </h2>
        <h1>Signup</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={emailInputHandler} />
        <label htmlFor="userName">Username : </label>
        <input
          type="text"
          id="userName"
          onChange={usernameInputHandler}
        ></input>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          onChange={passwordInputHandler}
        ></input>
        <button disabled={!submitValid}>Submit</button>
        {error && <span className="error">{error}</span>}
        <p>
          Already registered? Click to{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </Card>
    </form>
  );
};

export default SignUpPage;
