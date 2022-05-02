import React, { useState } from "react";
import "./SearchBooks.css";
import BookItem from "./BookItem.js";

const SearchBooks = () => {
  const [bookInput, setBookInput] = useState("");
  const [searchData, setSearchData] = useState("");

  const GOOGLE_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";

  const inputSearchHandler = (e) => {
    setBookInput(e.target.value);
  };

  const searchClickHandler = async () => {
    const response = await fetch(
      `${BOOK_API}${bookInput}&key=${GOOGLE_API_KEY}&maxResults=20`
    );
    let data = "";
    response.ok && (data = await response.json());
    console.log(data.items);
    setSearchData(data.items);
    setBookInput("");
  };

  return (
    <div className="searchbox">
      <input
        type="text"
        placeholder="Search Books"
        onChange={inputSearchHandler}
        value={bookInput}
      ></input>
      <button onClick={searchClickHandler}>Search</button>

      {searchData &&
        searchData.map((book) => {
          return (
            <BookItem
              title={book.volumeInfo.title}
              key={book.volumeInfo.title + book.volumeInfo.publishedDate}
              imgLink={book.volumeInfo.imageLinks.thumbnail}
            />
          );
        })}
    </div>
  );
};

export default SearchBooks;
