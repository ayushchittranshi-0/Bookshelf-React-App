import React from "react";

const BookItem = ({ title, imgLink, isLogin, loginDbKey, volumeId }) => {
  const addBookHandler = async () => {
    const response = await fetch(
      "https://bookshelf-project-345913-default-rtdb.asia-southeast1.firebasedatabase.app/userDatabase" +
        loginDbKey +
        ".json",
      {
        method: "POST",
        body: JSON.stringify({
          volumeId: volumeId,
          completed: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  return (
    <div className="bookbox">
      <img src={imgLink} alt="bookimg" />
      <p>{title}</p>
      <button onClick={addBookHandler} disabled={!isLogin}>
        Add Book
      </button>
    </div>
  );
};

export default BookItem;
