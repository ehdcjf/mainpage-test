import React, { useState, useEffect } from "react";
import { StyledCommentForm } from "./style";

const CommentForm = (props) => {
  const { handleCreate, master, sub_master } = props;

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const { value } = { ...e.target };
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      content: input,
      master: master,
      sub_master: 0,
    };
    if (sub_master != undefined) data.sub_master = sub_master;
    handleCreate(data);
    setInput("");
    //
  };

  return (
    <StyledCommentForm>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <span className="ps_box">
            <input
              type="text"
              className="int"
              placeholder="댓글을 입력해주세요."
              onChange={handleChange}
              value={input}
            />
          </span>
          <button type="submit" className="btn">
            등록
          </button>
        </form>
      </div>
    </StyledCommentForm>
  );
};

export default CommentForm;
