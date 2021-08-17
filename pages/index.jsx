/*
import BlogLayout from "../components/BlogLayout";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UserLogoutAction } from "../reducers/user";
import { deleteToken } from "../components/api/deleteToken";
import Router from "next/router";
const Index = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const logout = new URL(window.location.href).searchParams.get("logout");
    if (logout == "success") {
      const result = await deleteToken();
      if (result.isLogout) dispatch(UserLogoutAction());
      Router.push("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <BlogLayout>
        Hello NEXT
        <div>
          <img src="/arger.jpg" />
        </div>
      </BlogLayout>
    </>
  );
};

export default Index;
*/

import {useState} from 'react'; 
import Home from '../containers/Home';

const Index = () => {


  return (
    <>
<Home/>
      
    </>
  );
};

export default Index;



