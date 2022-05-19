import React, { useEffect, useState } from "react";
import BookListItem from "./BookListItem";

const UserBookData = ({ loginDbKey }) => {
  const [bookList, setBookList] = useState({});

  useEffect(() => {
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
    retrieveBookList();
  }, [loginDbKey]);

  return (
    <div>
      {bookList &&
        Object.keys(bookList).map((bookID) => {
          return (
            <BookListItem
              book={bookID}
              key={bookID}
              completed={bookList[bookID]}
              loginDbKey={loginDbKey}
            ></BookListItem>
          );
        })}
    </div>
  );
};

export default UserBookData;
