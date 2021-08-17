import { useState, useEffect } from "react";
import Link from "next/link";
import UpdateForm from "./CommentUpdateForm";
import CommentForm from "./CommentForm";
import ReplyList from "./ReplyList";

import {
  createComment,
  showComment,
  destroyComment,
  updateComment,
} from "../api/Comment";

const ReplyItem = (props) => {
  const {
    nickname,
    image,
    id,
    writer,
    content,
    master,
    board_id,
    date,
    liked,
    disliked,
    isUpdate,
    reply,
    subidx,
    subnick,
    isLike,
    isWriter,
    isReply,
    handleDelete,
    handleModify,
    handleCreate,
  } = props;

  const [sub, setSub] = useState(false);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (subidx > 0) {
      setSub(true);
    }
  }, []);

  const handleUpdate = (value) => {
    setUpdate(value);
  };

  const showReplyMakeForm = (value) => {
    setCreate(value);
  };

  const handleShow = (value) => {
    setTimeout(setShowReply(value), 1000);
  };

  const deleteRequest = () => {
    const answer = confirm("삭제하시겠습니까?");
    if (answer) {
      handleDelete();
    }
  };

  ///////////////////repli CRUD/////////////////////
  ///=====CREATE

  return (
    <>
      <div className="comment-row">
        <div>
          <img src="" alt="" />
        </div>
        <ul>
          <li>
            <Link href="/user/info/:id" as={`/user/info/${writer}`}>
              <a>{nickname}</a>
            </Link>
            <span>{date}</span>
            {isUpdate && <span>(수정됨)</span>}
            {isWriter && (
              <>
                <button onClick={() => handleUpdate(true)}>수정</button>
                <button onClick={deleteRequest}>삭제</button>
              </>
            )}
          </li>
          {update ? (
            <UpdateForm
              content={content}
              handleUpdate={handleUpdate}
              handleModify={handleModify}
              id={id}
              writer={writer}
            />
          ) : (
            <li>
              {sub && (
                <Link href="/user/info/:id" as={`/user/info/${subidx}`}>
                  <a style={{ color: "blue", marginRight: "10px" }}>
                    {subnick}
                  </a>
                </Link>
              )}
              {content}
            </li>
          )}

          <li>
            <span>
              {liked}/{disliked}
            </span>
            {create === false ? (
              <span
                onClick={() => {
                  showReplyMakeForm(true);
                }}
              >
                답글쓰기
              </span>
            ) : (
              <span
                onClick={() => {
                  showReplyMakeForm(false);
                }}
              >
                답글쓰기 취소
              </span>
            )}
          </li>

          {create && (
            <CommentForm
              master={master}
              sub_master={writer}
              handleCreate={handleCreate}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default ReplyItem;
