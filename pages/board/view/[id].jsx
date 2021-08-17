import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showArticle, deleteArticle } from "../../../components/api/Article";
import { ShowArticleAction } from "../../../reducers/article";
import { DeleteArticleAction } from "../../../reducers/board";
import Comment from "../../../components/test/Comment";
import Link from "next/link";
import Router from "next/router";
import { LikeBtn } from "../../../components/LikeBtn";
import { StyledArticleContainer, StyledContainer } from "./style";
import BlogLayout from "../../../components/BlogLayout";

const View = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.article);
  const { type, page, search, keyword, rows } = useSelector(
    (state) => state.board
  );
  const router = useRouter();
  const { id } = router.query;
  const blike = "blike";
  const clike = "clike";

  const makeQuery = () => {
    let queryStr = `/board/list?type=${type}&rows=${rows}&page=${page}`;
    if (search !== null && keyword !== null)
      queryStr += `&search=${search}&keyword=${keyword}`;
    return queryStr;
  };

  useEffect(async () => {
    if (id !== undefined) {
      const data = { id: id };
      const result = await showArticle(data); //// 정보를 가져올 필요가 없을 때도 가져온다.??
      dispatch(ShowArticleAction(result));
    }
  }, [id]);

  const deleteHandler = async () => {
    const data = {
      id,
      useridx: view.useridx,
    };
    const result = await deleteArticle(data);
    if (result.success === true) {
      dispatch(DeleteArticleAction(result));
      const href = makeQuery();
      Router.push(href);
    } else {
      alert("당신에게는 이 글에 대한 삭제 권한이 없습니다.");
    }
  };

  const modifyHandler = () => {
    Router.push(
      {
        pathname: `/board/modify`,
        query: {
          id: id,
        },
      },
      `/board/modify?id=${id}`
    );
  };

  const moveList = () => {
    const href = makeQuery();
    Router.push(href);
  };

  const renderArticleAction = () => {
    if (view.del === 0 && view.isWriter === true) {
      return (
        <>
          <Link href="/board/:[editor]" as={`/board/modify?id=${id}`}>
            <a>수정</a>
          </Link>
          <span> | </span>
          {/* <button onClick={modifyHandler}>수정</button> */}
          <button onClick={deleteHandler}>삭제</button>
        </>
      );
    }
  };

  const handleLike = async (v) => {
    //비회원 확인 만들기.
    const data = {
      board_id: id,
      isLike: v,
    };
    const result = await updateLike(data);
    console.log(result);
  };

  return (
    <BlogLayout>
      <StyledContainer>
        {/* 게시글 영역 */}
        <StyledArticleContainer>
          <div>
            <h2 className="title">{view.subject}</h2>
            <div className="articleActionBtn">{renderArticleAction()}</div>
          </div>
          <div>
            <span className="writer">
              <Link
                href="/user/info/:[useridx]"
                as={`/user/info/${view.useridx}`}
              >
                <a>{view.nickname}</a>
              </Link>
            </span>
            <span className="createdAt">{view.createdAt}</span>

            <span className="article-hit">조회수: {view.hit}</span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: view.content }}></div>

          {id !== undefined && (
            <LikeBtn
              isLike={view.isLike}
              type={blike}
              id={id}
              liked={view.liked}
              disliked={view.disliked}
            />
          )}
          <button onClick={moveList}>게시판 목록</button>
        </StyledArticleContainer>

        {/* 댓글영역 */}
        <div>{id !== undefined && <Comment id={id} />}</div>
      </StyledContainer>
    </BlogLayout>
  );
};

export default View;
