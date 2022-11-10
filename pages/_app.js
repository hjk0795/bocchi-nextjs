import Head from "next/head";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  const [userGlobal, setUserGlobal] = useState({});


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserGlobal(user);
      console.log(user);
    } else {
      setUserGlobal();
    }
  });

  return (
    <>
      <Head></Head>

      <Header userGlobal={userGlobal} />
      <Layout>
        <Component {...pageProps} userGlobal={userGlobal} />
      </Layout>
    </>
  );
}

export default MyApp;
