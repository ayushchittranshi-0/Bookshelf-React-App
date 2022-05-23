import React from "react";
import "./BookItem.css";

const BookItem = ({ title, imgLink, isLogin, loginDbKey, volumeId, blurb }) => {
  const addBookHandler = async () => {
    console.log(loginDbKey, "    ", volumeId);
    let Bookobj = {};
    Bookobj[volumeId] = false;
    const response = await fetch(
      "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase/" +
        loginDbKey +
        "/BookList.json",
      {
        method: "PATCH",
        body: JSON.stringify(Bookobj),
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  return (
    <div className="bookbox">
      <img src={imgLink} alt="bookimg" />
      <div className="bookbox-right">
        <p className="book-title">{title}</p>
        <p className="blurb">{blurb}</p>
        <button onClick={addBookHandler} disabled={!isLogin}>
          Add to Library
        </button>
      </div>
    </div>
  );
};

export default BookItem;
