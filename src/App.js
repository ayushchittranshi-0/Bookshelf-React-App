import React, { Fragment, useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar.js";
import { Route } from "react-router-dom";
import Login from "./Components/Login.js";
import AddBook from "./Components/AddBook.js";
import SearchBooks from "./Components/SearchBooks.js";
import Card from "./Components/UI/Card.js";
import LoginPage from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage.js";

function App() {
  const [loginState, setLoginstate] = useState(0);

  return (
    <Fragment>
      <NavBar setLoginstate={setLoginstate} />
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Fragment>
  );
}

export default App;
