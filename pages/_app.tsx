import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Header from "../components/header";
import Layout from "../components/layout";
import type { AppProps } from 'next/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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
