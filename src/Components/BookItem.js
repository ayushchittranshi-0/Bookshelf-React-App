import React from "react";

const BookItem = ({ title, imgLink }) => {
  return (
    <div className="bookbox">
      <img src={imgLink} alt="bookimg" />
      <p>{title}</p>
    </div>
  );
};

export default BookItem;
