import React from "react";

const LogStatus = ({ loginState, username }) => {
  return <div>{loginState && <p>Hello {username}</p>}</div>;
};

export default LogStatus;
