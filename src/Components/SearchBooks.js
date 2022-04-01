import React from "react";

const SearchBooks = () => {
  const searchBookHandler = () => {};

  return (
    <div>
      <input type="text" placeholder="Search Books"></input>
      <button onClick={searchBookHandler}>Search</button>
    </div>
  );
};

export default SearchBooks;
