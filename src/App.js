import React, { Fragment, useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import AddBook from "./Components/AddBook.js";
import SearchBooks from "./Components/SearchBooks.js";
import Card from "./Components/UI/Card.js";

function App() {
  const [loginState, setLoginstate] = useState(0);

  return (
    <Fragment>
      <NavBar setLoginstate={setLoginstate} />
      {/* <Login /> */}
      {/* <SearchBooks></SearchBooks> */}
      {/* <Card></Card> */}
    </Fragment>
  );
}

export default App;
