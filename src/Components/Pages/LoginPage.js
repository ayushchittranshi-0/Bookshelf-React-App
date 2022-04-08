import React from "react";
import "./LoginPage.css";
import Card from "../UI/Card";

const LoginPage = () => {
  return (
    <form>
      <Card className="form-container">
        <label htmlFor="userName">Username : </label>
        <input type="text" id="userName"></input>
        <label htmlFor="password">Password :</label>
        <input type="password" id="password"></input>
      </Card>
    </form>
  );
};

export default LoginPage;
