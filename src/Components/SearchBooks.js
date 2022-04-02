import React, { useState } from "react";

const SearchBooks = () => {
  const [bookInput, setBookInput] = useState("Ayush");

  const GOOGLE_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";

  const inputSearchHandler = (e) => {
    setBookInput(e.target.value);
  };

  const searchClickHandler = async () => {
    const response = await fetch(
      `${BOOK_API}${bookInput}&key=${GOOGLE_API_KEY}`
    );

    console.log(`${BOOK_API}${bookInput}&key=${GOOGLE_API_KEY}`);

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Books"
        onChange={inputSearchHandler}
        value={bookInput}
      ></input>
      <button onClick={searchClickHandler}>Search</button>
    </div>
  );
};

export default SearchBooks;
