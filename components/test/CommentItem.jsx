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

const CommentItem = (props) => {
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
  } = props;
  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [replys, setReplys] = useState(reply);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [showReply, setShowReply] = useState(false);

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
  const handleCreate = async (v) => {
    const data = {
      board_id: board_id,
      content: v.content,
      master: v.master,
      sub_master: v.sub_master,
    };
    const result = await createComment(data);
    const newList = [result, ...list];
    setReplys(replys + 1);
    setList(newList);
    showReplyMakeForm(false);
    handleShow(true);
  };

  //======READ

  useEffect(async () => {
    const data = {
      board_id: board_id,
      skip: skip,
      master: id,
    };
    const result = await showComment(data);
    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);

    return () => {
      setList([]);
      setSkip(10);
    };
  }, [showReply]);

  const fetchMoreComment = async () => {
    const data = {
      board_id: board_id,
      skip: skip,
      master: id,
    };
    const result = await showComment(data);
    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);
  };

  ////  reply Update

  const handleModifyReply = async (data) => {
    const result = await updateComment(data);
    if (result.success) {
      const newList = [...list];
      newList.forEach((v) => {
        if (v.id == data.id) {
          v.content = data.content;
          v.isUpdate = true;
        }
      });
      setList(newList);
      alert("수정되었습니다.");
    } else {
      alert(result.error);
    }
  };

  const handleDeleteReply = async (data) => {
    const result = await destroyComment(data);
    if (result.success) {
      const newList = [...list];
      newList.forEach((v) => {
        if (v.id == data.id) {
          v.content = "삭제된 댓글입니다.";
          v.isWriter = false;
          v.type = null;
        }
      });
      setList(newList);
      alert("삭제되었습니다.");
    } else {
      alert(result.error);
    }
  };

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
            <li>{content}</li>
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

          {create && <CommentForm master={id} handleCreate={handleCreate} />}
          <li>
            {parseInt(replys) > 0 && (
              <>
                {showReply === false ? (
                  <span
                    onClick={() => {
                      handleShow(true);
                    }}
                  >
                    답글 {replys}개 보기
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      handleShow(false);
                      // clearReply();
                    }}
                  >
                    답글 숨기기
                  </span>
                )}
              </>
            )}
          </li>
          {showReply && (
            <li>
              <ul>
                <ReplyList
                  master={id}
                  list={list}
                  handleDelete={handleDeleteReply}
                  handleModify={handleModifyReply}
                  handleCreate={handleCreate}
                />
                {reply > list.length && (
                  <li>
                    <span onClick={fetchMoreComment}>답글 더보기</span>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CommentItem;
