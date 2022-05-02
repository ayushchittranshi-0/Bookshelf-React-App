import React, { Fragment, useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import HomePage from "./Components/Pages/HomePage.js";
import SearchBooks from "./Components/SearchBooks";

function App() {
  const [loginState, setLoginstate] = useState(0);

  return (
    <Fragment>
      <NavBar setLoginstate={setLoginstate} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/searchbooks" element={<SearchBooks />}></Route>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
