import React, { useState } from "react";
import "./SearchBooks.css";
import BookItem from "./BookItem.js";

const SearchBooks = ({ isLogin, loginDbKey }) => {
  const [bookInput, setBookInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState("noReq");

  const GOOGLE_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";

  const inputSearchHandler = (e) => {
    setBookInput(e.target.value);
  };

  const searchClickHandler = async () => {
    setIsLoading("yes");
    setSearchData([]);
    const response = await fetch(
      `${BOOK_API}${bookInput}&key=${GOOGLE_API_KEY}&maxResults=20`
    );
    let data = "";
    response.ok && (data = await response.json());
    data.totalItems !== 0 && console.log(data.items);
    data.totalItems !== 0 && setSearchData(data.items);
    setBookInput("");
    setIsLoading("no");
  };

  return (
    <div className="searchbox">
      <input
        type="text"
        placeholder="Search Books"
        onChange={inputSearchHandler}
        value={bookInput}
      ></input>
      <button onClick={searchClickHandler} disabled={!bookInput}>
        Search
      </button>
      {isLoading === "yes" && <p>Loading</p>}
      {isLoading === "no" &&
        searchData &&
        searchData.map((book) => {
          // console.log(typeof book);
          return (
            <BookItem
              title={book.volumeInfo.title}
              key={book.volumeInfo.title + book.volumeInfo.publishedDate}
              imgLink={
                book.volumeInfo.hasOwnProperty("imageLinks")
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
              }
              loginDbKey={loginDbKey}
              isLogin={isLogin}
              volumeId={book.id}
            />
          );
        })}
      {!searchData && <p>No books found</p>}
    </div>
  );
};

export default SearchBooks;
