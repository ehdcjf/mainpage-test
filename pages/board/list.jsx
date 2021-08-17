import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showList } from "../../components/api/showList";
import { ShowListAction } from "../../reducers/board";
import { Pageblock } from "../../components/pageblock";
import Router from "next/router";

const List = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);

  useEffect(async () => {
    const queryStr = new URL(window.location.href).searchParams;
    const data = {
      type: queryStr.get("type"),
      rows: queryStr.get("rows"),
      page: queryStr.get("page"),
      search: queryStr.get("search"),
      keyword: queryStr.get("keyword"),
    };

    const result = await showList(data);
    await dispatch(ShowListAction(result));
  }, []);

  const handlePage = async (num) => {
    const updatePage = { ...board, page: num };
    const result = await showList(updatePage);
    await dispatch(ShowListAction(result));
    Router.push(
      {
        pathname: `/board/list`,
        query: {
          type: board.type,
          rows: board.rows,
          page: num,
        },
      },
      `/board/list?type=${board.type}&rows=${board.rows}&page=${num}`,
      { shallow: true }
    );
  };

  const renderList = (list) => {
    return list.map((v) => {
      return (
        <tr key={v.id}>
          <td>{v.id}</td>
          <td>
            <Link href="/board/view/:[id]" as={`/board/view/${v.id}`}>
              <a>{v.subject}</a>
            </Link>
          </td>
          <td>{v.nickname}</td>
          <td>{v.createdAt}</td>
          <td>{v.hit}</td>
          <td>{v.like}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div>
        <div>
          <Link href="/board/write">
            <a>글쓰기</a>
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>닉네임</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>{renderList(board.list)}</tbody>
        </table>
      </div>
      <Pageblock
        pageblock={board.pageblock}
        endpage={board.endpage}
        handlePage={handlePage}
      />
    </>
  );
};

export default List;
