import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UpdateForm = (props) => {
  const { id, writer, handleUpdate, handleModify } = props;
  const [input, setInput] = useState(props.content);

  const handleChange = (e) => {
    const { value } = { ...e.target };
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: props.id,
      content: input,
      writer: props.writer,
    };
    setInput("");
    handleModify(data);
    handleUpdate(false);
  };

  return (
    <li className="comment-form">
      <form onSubmit={handleSubmit}>
        <span className="ps_box">
          <input
            type="text"
            className="int"
            // placeholder="댓글을 입력해주세요."
            onChange={handleChange}
            value={input}
          />
        </span>
        <div>
          <button type="submit" className="btn">
            등록
          </button>
          <button
            onClick={() => {
              handleUpdate(false);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </li>
  );
};

export default UpdateForm;
