import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Header from "../components/header";
import Layout from "../components/layout";

function MyApp({ Component, pageProps: { ...pageProps } }) {
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
