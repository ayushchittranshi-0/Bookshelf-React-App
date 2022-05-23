import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar.js";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import HomePage from "./Components/Pages/HomePage.js";
import SearchBooks from "./Components/SearchBooks";
import UserBookData from "./Components/Pages/UserBookData";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loginDbKey, setLoginDbKey] = useState("");
  const [bookInput, setBookInput] = useState("");

  useEffect(() => {
    setLoginDbKey("");
    const findkey = async (email) => {
      if (email) {
        const response = await fetch(
          "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase.json"
        );
        const data = await response.json();
        for (const key in data) {
          if (data[key].email === email) {
            console.log(key);
            setLoginDbKey(key);
            setUsername(data[key].username);
          }
        }
      }
    };
    findkey(userEmail);
  }, [userEmail]);

  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      setIsLogin(true);
      setUserEmail(localStorage.getItem("email"));
    }
  }, []);

  return (
    <Fragment>
      <NavBar
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setLoginDbKey={setLoginDbKey}
        setUserEmail={setUserEmail}
        username={username}
        setUsername={setUsername}
        setBookInput={setBookInput}
      />
      <Routes>
        <Route path="/" element={<HomePage isLogin={isLogin} />}></Route>
        {!isLogin && (
          <Route
            path="/login"
            element={
              <LoginPage setUserEmail={setUserEmail} setIsLogin={setIsLogin} />
            }
          ></Route>
        )}
        <Route
          path="/searchbooks"
          element={
            <SearchBooks
              isLogin={isLogin}
              loginDbKey={loginDbKey}
              bookInput={bookInput}
              setBookInput={setBookInput}
            />
          }
        ></Route>
        {!isLogin && (
          <Route
            path="/signup"
            element={
              <SignUpPage
                setUserEmail={setUserEmail}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            }
          />
        )}
        {isLogin && (
          <Route
            path="/userlibrary"
            element={<UserBookData loginDbKey={loginDbKey} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
