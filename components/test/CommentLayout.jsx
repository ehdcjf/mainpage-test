import React, { useContext, useEffect, useReducer } from "react";
// import { getComment } from "./api/api";

const CommentLayout = ({ children }) => {
  useEffect(async () => {}, []);

  return <ul className="comment">{children}</ul>;
};

//ReactDOM
export default CommentLayout;
