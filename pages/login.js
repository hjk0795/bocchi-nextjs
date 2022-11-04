import LoginForm from "../components/loginForm";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/login.module.css";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";

export default function Login({}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
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
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
              });
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
              signIn("github", {
                callbackUrl: "http://localhost:3000/dashboard",
              });
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <BsGithub style={{ width: "25px", height: "25px" }} />{" "}
              <span style={{marginRight: "2px"}}>Sign in with Github</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
