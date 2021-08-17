import styled from "styled-components";

export const StyledCommentForm = styled.li`
  /* border: 5px solid black; */
  width: 1280px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;

  /* display:${(props) => (props.flag ? "block" : "none")}; */
  & > div:nth-child(1) {
    width: 40px;
    height: 40px;
  }
  & > div:nth-child(2) {
    width: 1240px;
    height: 40px;
  }
  & > div:nth-child(2) > form > span > input {
    border: none;
    width: 1200px;
  }
`;
