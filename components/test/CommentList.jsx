import CommentItem from "./CommentItem";

const CommentList = (props) => {
  const list = props.list;
  const handleDelete = props.handleDelete;
  const handleModify = props.handleModify;
  const Item = list.map((v, i) => {
    return (
      <CommentItem
        handleDelete={() => {
          handleDelete({ id: v.id, writer: v.writer });
        }}
        handleModify={handleModify}
        key={i}
        id={v.id}
        image={v.image}
        nickname={v.nick}
        writer={v.writer}
        content={v.content}
        master={v.master}
        board_id={v.board_id}
        date={v.createdAt}
        liked={v.liked}
        disliked={v.disliked}
        isUpdate={v.isUpdate}
        reply={v.reply}
        subidx={v.subidx}
        subnick={v.subnick}
        isLike={v.isLike}
        isWriter={v.isWriter}
      />
    );
  });

  // if (loadding) return <li>로딩중입니다^^</li>;
  // if (error) return <li>에러!!</li>;
  return <li>{Item}</li>;
};

export default CommentList;
