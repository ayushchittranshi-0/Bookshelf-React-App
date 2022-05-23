import React, { useEffect, useState } from "react";
import "./LoginSignupPage.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../../Components/Helpers/Regex.js";
import greenImg from "../../Images/icons8-green-circle-48.png";
import redImg from "../../Images/icons8-red-circle-48.png";

const SignUpPage = ({ setIsLogin, setUserEmail }) => {
  const [signUpState, setSignUpState] = useState({
    email: "",
    username: "",
    password: "",
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
          setError(
            (prevState) =>
              prevState +
              "Password must be atleast 8 characters.It can only consit of numbers and letters and must contain atleast one of both. "
          );
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
    if (response.ok) {
      let response2 = await fetch(
        "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase.json",
        {
          method: "POST",
          body: JSON.stringify({
            email: signUpState.email,
            username: signUpState.username,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response2);
    }
    setSignUpState({ email: "", username: "", password: "" });
    response.ok && setIsLogin(true);
    response.ok && localStorage.setItem("email", signUpState.email);
    setUserEmail(signUpState.email);
    setTimeout(() => {
      response.ok && navigate("/userlibrary");
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessState("loginSignup");
    }, 3000);
  }, [successState]);

  return (
    <form onSubmit={SignupSubmitHandler}>
      <Card className="form-container">
        <div className={successState}>
          <img
            src={successState === "loginSignup success" ? greenImg : redImg}
            alt="red/green circle"
          />
          <h2>
            {successState === "loginSignup success"
              ? "Signup Successful"
              : successState === "loginSignup fail"
              ? "Something went wrong"
              : "Status Unknown"}{" "}
          </h2>
        </div>

        <h1>Signup</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={signUpState.email}
          id="email"
          onChange={emailInputHandler}
        />
        <label htmlFor="userName">Username : </label>
        <input
          type="text"
          id="userName"
          onChange={usernameInputHandler}
          value={signUpState.username}
        ></input>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          onChange={passwordInputHandler}
          value={signUpState.password}
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
