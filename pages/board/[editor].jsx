import Head from "next/head";
import { useState, useEffect } from "react";
import QuillEditor from "../../components/QuillEditor";
import Styled from "styled-components";
import { createArticle, updateArticle } from "../../components/api/Article";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CreateArticleAction } from "../../reducers/board";

const StyledContainer = Styled.div`

 min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = Styled.h1`
margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

export default function Home() {
  const router = useRouter();
  const article = useSelector((state) => state.article);
  const { editor } = router.query;

  const dispatch = useDispatch();
  const [body, setBody] = useState(""); // Quill 에디터의 innerHTML을 담는 state
  const [subject, setSubject] = useState("");

  /* 외부에서 body의 수정이 일어난 경우 body에 자동으로 적용되지 않습니다!
     이 함수를 호출했을 때 컴포넌트 내의 useEffect가 실행되어 body의 수정 사항이 적용됩니다.*/

  useEffect(() => {
    if (editor === "modify") {
      setBody(article.content);
      setSubject(article.subject);
    }
  }, [editor]);

  const handleSubject = (e) => {
    const { value } = { ...e.target };
    setSubject(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      subject: subject,
      body: body,
      id: article.id,
    };
    // setBody("");

    if (editor === "write") {
      delete data.id;
      //==write
      const result = await createArticle(data);
      dispatch(CreateArticleAction());
      Router.push(`/board/view/${result.insertId}`);
    } else {
      //==modify
      const result = await updateArticle(data);
      // dispatch(UpdateArticleAction(result));
      Router.push(`/board/view/${article.id}`);
    }
    // await dispatch(UserLoginAction(result));
  };

  return (
    <StyledContainer>
      <Head>
        {/* 관련된 리소스 로드 */}
        <link rel="stylesheet" src="../../style/style.css" />
        <link
          href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
          rel="stylesheet"
        />
        <script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></script>
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
        <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css"
        />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
      </Head>

      {editor === "write" ? (
        <StyledTitle>글쓰기</StyledTitle>
      ) : (
        <StyledTitle>수정하기</StyledTitle>
      )}

      <div style={{ width: "80%", marginTop: "40px" }}>
        <div>
          제목:
          <input
            type="text"
            onChange={handleSubject}
            value={subject}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <QuillEditor body={body} handleQuillChange={setBody} />
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button size="large" type="submit" className="">
            {editor === "write" ? (
              <span>작성 완료</span>
            ) : (
              <span>수정 완료</span>
            )}
          </button>
        </div>
      </form>
    </StyledContainer>
  );
}
