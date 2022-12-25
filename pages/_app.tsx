import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Header from "../components/header";
import Layout from "../components/layout";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
