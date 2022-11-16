import LoginForm from "../components/loginForm";
import styles from "../styles/login.module.css";
import { BsGithub, BsGoogle, BsTwitter } from "react-icons/bs";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";

export default function Login(props) {
  const providerGoogle = new GoogleAuthProvider();
  const providerTwitter = new TwitterAuthProvider();
  const router = useRouter();
  const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
  const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
  const twitterClientID = process.env.NEXT_PUBLIC_TWITTER_ID;
  const codeVerifier = process.env.NEXT_PUBLIC_CODE_VERIFIER;

  async function handleSignIn(provider) {
    try {
      await signInWithRedirect(auth, provider).then(router.push("/dashboard"));
    } catch (error) {
      console.log(error.message);
    }
  }

  function signInWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        githubClientID +
        "&state=" +
        requestState
    );
  }

  async function signInWithTwitter() {
    const params =
      "?response_type=code" +
      "&client_id=" +
      twitterClientID +
      "&redirect_uri=" +
      "http://localhost:3000/2b2fdd8dce12993016a59607a51fe516979370efdc124e2e45300a0a43ca2e05" +
      "&scope=" +
      "tweet.read%20users.read%20follows.read%20follows.write" +
      "&state=" +
      requestState +
      "&code_challenge=" +
      codeVerifier +
      "&code_challenge_method=plain";

    window.location.assign("https://twitter.com/i/oauth2/authorize" + params);
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
              return signInWithTwitter();
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
