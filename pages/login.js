import LoginForm from "../components/loginForm";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/login.module.css";
import Script from "next/script";
import Head from "next/head";
import GoogleIcon from '@mui/icons-material/Google';

export default function Login({}) {


  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (<>

    <div className={styles.container}>
      <LoginForm />

      <div>
        <button
        style={{marginTop: "2rem"}}
        class="btn btn-outline-dark"
          onClick={() => {
            signIn("google", {
              callbackUrl: "http://localhost:3000/dashboard",
            });
          }}
        >
          <GoogleIcon /> Sign in with Google
        </button>
      </div>
    </div>
    </>
  );
}
