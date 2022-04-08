import React from "react";
import "./Card.css";

const Card = (props) => {
  let classes = `${props.className} Card`;

  return <div className={classes}>{props.children}</div>;
};

export default Card;
