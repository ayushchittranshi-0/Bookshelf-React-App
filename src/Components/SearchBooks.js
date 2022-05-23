import React, { useState } from "react";
import "./SearchBooks.css";
import BookItem from "./BookItem.js";

const SearchBooks = ({ isLogin, loginDbKey, bookInput, setBookInput }) => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState("noReq");
  const [nobookfound, setNobookfound] = useState(false);

  const GOOGLE_API_KEY = "AIzaSyBN4j6yCYLRBWpikfZ-sK-_SlF72wgH_Ns";
  const BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";

  const inputSearchHandler = (e) => {
    setNobookfound(false);
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
    data.totalItems === 0 && setNobookfound(true);
    setIsLoading("no");
  };

  return (
    <div className="searchpage-container">
      <div className="searchbox">
        <div className="searchformgroup">
          <input
            type="text"
            placeholder="Search Books"
            onChange={inputSearchHandler}
            value={bookInput}
            onKeyDown={(e) => {
              e.key === "Enter" && searchClickHandler();
            }}
          ></input>
          <button onClick={searchClickHandler} disabled={!bookInput}>
            Search
          </button>
        </div>
        {!bookInput && (
          <p className="msg">
            Enter the bookname above and we can start organising your bookshelf!
          </p>
        )}
        {nobookfound && <p className="msg">No Books Found </p>}
      </div>
      <div className="searchResults-container">
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
                blurb={book.volumeInfo.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchBooks;
