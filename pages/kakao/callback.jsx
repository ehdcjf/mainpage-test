import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaoCallback } from "../../components/api/kakaoCallback";
// import Store from "../store/context";
import Router from "next/router";
import { UserLoginAction } from "../../reducers/user";

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const { loadding, IsLogin } = useSelector((state) => state.user);

  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const result = await kakaoCallback(dispatch, code);

    // console.log(result);
    //이 아래 부분을 kakaoCallback 함수에서 다 처리하고 싶은데 방법을 못찾음.
    if (!result.isUser) {
      Router.push(`/user/join?id=${result.userid}`);
    } else {
      dispatch(UserLoginAction(result));
      Router.push(`/`);
    }
  }, []);

  return (
    <>
      <span>카카오 로그인 중입니다.</span>
    </>
  );
};

export default KakaoLogin;
