import Head from "next/head";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps: { ...pageProps } }) {

  return (
    <>
      <Head></Head>

      <Header/>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </>
  );
}

export default MyApp;
