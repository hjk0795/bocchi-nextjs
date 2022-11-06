import LoginForm from "../components/loginForm";
import styles from "../styles/login.module.css";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login(props) {
  const providerGoogle = new GoogleAuthProvider();
  const providerGithub = new GithubAuthProvider();
  providerGithub.addScope('user');
  const router = useRouter();

  // useEffect(() => {
  //   if (props.userGlobal) {
  //     router.push("/");
  //   }
  // }, []);

  async function handleSignIn(provider) {
    try {
      await signInWithRedirect(auth, provider)
      
      // .then(router.push("/dashboard"));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <LoginForm />

        <div>
          <button
            style={{ marginTop: "2rem", width: "200px" }}
            className="btn btn-outline-dark"
            onClick={() => {
              return handleSignIn(providerGoogle);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <BsGoogle style={{ width: "25px", height: "25px" }} />{" "}
              <span>Sign in with Google</span>
            </div>
          </button>
        </div>

        <div>
          <button
            style={{ marginTop: "0.1rem", width: "200px" }}
            className="btn btn-outline-dark"
            onClick={() => {
              return handleSignIn(providerGithub);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <BsGithub style={{ width: "25px", height: "25px" }} />{" "}
              <span style={{ marginRight: "2px" }}>Sign in with Github</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
