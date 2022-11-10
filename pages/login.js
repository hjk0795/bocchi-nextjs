import LoginForm from "../components/loginForm";
import styles from "../styles/login.module.css";
import { BsGithub, BsGoogle, BsTwitter} from "react-icons/bs";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login(props) {
  const providerGoogle = new GoogleAuthProvider();
  const providerTwitter = new TwitterAuthProvider();
  const router = useRouter();
  const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam) {
      async function getAccessToken() {
        await fetch(
          "http://localhost:3000/api/github/getAccessToken?code=" + codeParam,
          {
            method: "GET",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const credential = GithubAuthProvider.credential(data.access_token);
            signInWithCredential(auth, credential);
            router.push("/dashboard");
          });
      }

      getAccessToken();
    }
  }, []);

  async function handleSignIn(provider) {
    try {
      await signInWithRedirect(auth, provider).then(router.push("/dashboard"));
    } catch (error) {
      console.log(error.message);
    }
  }

  function signInWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + githubClientID
    );
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
              return signInWithGithub();
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <BsGithub style={{ width: "25px", height: "25px" }} />{" "}
              <span style={{ marginRight: "2px" }}>Sign in with Github</span>
            </div>
          </button>
        </div>

        <div>
          <button
            style={{ marginTop: "0.1rem", width: "200px" }}
            className="btn btn-outline-dark"
            onClick={() => {
              return handleSignIn(providerTwitter);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <BsTwitter style={{ width: "25px", height: "25px" }} />{" "}
              <span style={{ marginRight: "2px" }}>Sign in with Twitter</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
