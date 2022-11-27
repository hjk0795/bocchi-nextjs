import LoginInternal from "../components/loginInternal";
import styles from "../styles/login.module.css";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";

export default function Login() {
  const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
  const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
  const providerGoogle = new GoogleAuthProvider();
  const router = useRouter();

  //Login by using authentication module in Firebase
  function signInWithGoogle() {
    try {
      signInWithRedirect(auth, providerGoogle);
      document.cookie = `isAuthenticated=true`;
      router.push("/dashboard");
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  }

  //Direct to the Github page requesting the user to authorize
  //If authorized, redirected to /callbackEndpointGithub by Github server
  function signInWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
      githubClientID +
      "&state=" +
      requestState
    );
  }

  return (
    <>
      <div className={styles.container}>
        <LoginInternal />

        <div>
          <button
            style={{ marginTop: "2rem", width: "200px" }}
            className="btn btn-outline-dark"
            onClick={() => {
              return signInWithGoogle();
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
      </div>
    </>
  );
}
