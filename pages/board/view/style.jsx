import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const StyledArticleContainer = styled.div`
  width: 60vw;
  min-height: 50vh;
  margin: 40px auto;

  & > div:nth-child(1) > h2 {
    display: inline-block;
    width: 80%;
    font-size: 26px;
    margin-bottom: 10px;
  }

  & > div:nth-child(1) > div {
    display: inline-block;
    width: 20%;
  }

  & > div:nth-child(1) > div > a {
    border: 1px solid black;
  }

  & > div:nth-child(1) > div > button {
    background-color: #666;
    font-size: 16px;
  }

  & > div {
    width: 100%;
    height: 40px;
  }

  & > div > .writer {
    float: left;
    margin-right: 20px;
  }

  & > div > .createdAt {
    float: left;
  }

  & > div > .article-hit {
    float: right;
  }
`;
