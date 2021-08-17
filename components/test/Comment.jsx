import CommentLayout from "./CommentLayout";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createComment,
  showComment,
  destroyComment,
  updateComment,
} from "../api/Comment";

const Comment = (props) => {
  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [fetching, setFetching] = useState(false);

  //===== init

  ///=====CREATE
  const handleCreate = async (v) => {
    const data = {
      board_id: props.id,
      content: v.content,
      master: 0,
    };
    const result = await createComment(data);
    const newList = [result, ...list];
    setList(newList);
    //
  };

  //======READ

  useEffect(async () => {
    const data = {
      board_id: props.id,
      skip: skip,
      master: 0,
    };
    const result = await showComment(data);
    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);
  }, []);

  //////==== infinity
  const fetchMoreComment = async () => {
    setFetching(true);
    const data = {
      board_id: props.id,
      skip: skip,
      master: 0,
    };
    const result = await showComment(data);
    const newList = [...list, ...result];
    setList(newList);
    setSkip(skip + 10);

    setFetching(false);
  };

  // const { loadding, commentItem, error } = state;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      fetchMoreComment();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //=====UPDATE
  const handleModify = async (data) => {
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

  //====DELETE
  const handleDelete = async (data) => {
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
    <CommentLayout>
      <CommentForm master={0} handleCreate={handleCreate} />
      <CommentList
        list={list}
        handleDelete={handleDelete}
        handleModify={handleModify}
      />
    </CommentLayout>
  );
};

export default Comment;
