import React, { useEffect, useState, useRef } from "react";

const BookListItem = ({ book, completed, loginDbKey }) => {
  console.log(book, completed);
  const [bookData, setBookData] = useState("");

  const getBookData = async () => {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes/" + book
    );
    const data = await response.json();
    setBookData(data);
    console.log(data);
  };

  useEffect(() => {
    getBookData();
  }, []);

  const checkHandler = async () => {
    console.log("clicked");
    const response = await fetch(
      "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase/" +
        loginDbKey +
        "/BookList/" +
        book +
        ".json",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.ok);
  };

  return (
    <div>
      {bookData && <p>{bookData.volumeInfo.title}</p>}
      {bookData && bookData.volumeInfo.hasOwnProperty("imageLinks") && (
        <img src={bookData.volumeInfo.imageLinks.thumbnail} alt="BookIMG" />
      )}
      <button onClick={checkHandler}>Delete from Library</button>
    </div>
  );
};

export default BookListItem;
