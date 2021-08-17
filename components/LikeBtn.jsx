import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeAction } from "./api/like";
import {
  InsertBLikeAction,
  DeleteBLikeAction,
  UpdateBLikeAction,
} from "../reducers/article";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export const LikeBtn = (props) => {
  const dispatch = useDispatch();
  const { liked, disliked } = props;
  const { isLike, type, id } = props;
  console.log(liked, disliked);

  const handleOutlineLike = (value) => {
    if (isLike === null) {
      handleInsert(value);
    } else {
      handleUpdate(value);
    }
  };

  const handleInsert = async (value) => {
    const data = {
      board_id: id,
      isLike: value,
      type: type,
      action: "INSERT",
    };

    const result = await likeAction(data);
    if (type === "blike") {
      dispatch(InsertBLikeAction(result.isLike));
    }
  };

  const handleDelte = async (value) => {
    const data = {
      board_id: id,
      type: type,
      action: "DELETE",
    };
    const result = await likeAction(data);
    if (type === "blike") {
      dispatch(DeleteBLikeAction(value));
    }
  };

  const handleUpdate = async (value) => {
    const data = {
      board_id: id,
      isLike: value,
      type: type,
      action: "UPDATE",
    };

    const result = await likeAction(data);
    if (type === "blike") {
      dispatch(UpdateBLikeAction(value));
    }
  };

  return (
    <div>
      <span className="liked">{liked}</span>
      {isLike === true ? (
        <button
          onClick={() => {
            handleDelte(true);
          }}
        >
          <AiFillLike />
        </button>
      ) : (
        <button
          onClick={() => {
            handleOutlineLike(true);
          }}
        >
          <AiOutlineLike />
        </button>
      )}
      {isLike === false ? (
        <button
          onClick={() => {
            handleDelte(false);
          }}
        >
          <AiFillDislike />
        </button>
      ) : (
        <button
          onClick={() => {
            handleOutlineLike(false);
          }}
        >
          <AiOutlineDislike />
        </button>
      )}
      <span className="disliked">{disliked}</span>
    </div>
  );
};
