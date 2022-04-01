import React, { Fragment } from "react";
import "./App.css";
import Login from "./Components/Login.js";
import AddBook from "./Components/AddBook.js";
import SearchBooks from "./Components/SearchBooks.js";

function App() {
  return (
    <Fragment>
      <header>
        <h1>Bookshelf App</h1>
        <Login />
      </header>
      <SearchBooks></SearchBooks>
    </Fragment>
  );
}

export default App;
