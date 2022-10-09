import Head from "next/head";
import LoginForm from "../components/loginForm";

export default function Login({ createdAccountData }) {
  return (
    <>
      <Head>
        <title>bocchi</title>
      </Head>

      <LoginForm />
    </>
  );
}
