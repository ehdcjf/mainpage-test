import { Router } from "next/router";
import { useEffect } from "react";
import axios from "axios";
//
export const kakaoCallback = async (dispatch, code) => {
  try {
    // console.log(code)
    // const response = await fetch(`http://localhost:3002/api/kakao?code=${code}`,{withCredentials: true});
    const response = await axios.get(
      `http://localhost:3002/api/kakao?code=${code}`,
      { withCredentials: true }
    );

    // console.log(response.data)
    // const data = await response.json();

    // console.log(response)

    return response.data;
  } catch (e) {
    return e;
  }
};
