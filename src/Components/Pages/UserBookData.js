import React, { useEffect, useState } from "react";
import BookListItem from "./BookListItem";
import "../UserBookData.css";

const UserBookData = ({ loginDbKey }) => {
  const [bookList, setBookList] = useState({});

  const retrieveBookList = async () => {
    const response = await fetch(
      "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase/" +
        loginDbKey +
        "/BookList.json",
      { headers: { "Content-Type": "application/json" } }
    );
    const data = await response.json();
    console.log(data);
    setBookList(data);
  };

  useEffect(() => {
    retrieveBookList();
  }, [loginDbKey]);

  return (
    <div className="library-container">
      {!bookList && (
        <p className="msg">
          No Books found. Search Books and add them to your library.
        </p>
      )}

      {bookList &&
        Object.keys(bookList).map((bookID) => {
          return (
            <BookListItem
              book={bookID}
              key={bookID}
              completed={bookList[bookID]}
              loginDbKey={loginDbKey}
              retrieveBookList={retrieveBookList}
            ></BookListItem>
          );
        })}
    </div>
  );
};

export default UserBookData;
