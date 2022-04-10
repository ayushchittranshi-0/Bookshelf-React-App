import React from "react";
import "./LoginSignupPage.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  let navigate = useNavigate();

  return (
    <form>
      <Card className="form-container">
        <h1>Signup</h1>
        <label htmlFor="userName">Username : </label>
        <input type="text" id="userName"></input>
        <label htmlFor="password">Password :</label>
        <input type="password" id="password"></input>
        <p>
          Already registered? Click to{" "}
          <span
            onClick={() => {
              navigate("/");
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
