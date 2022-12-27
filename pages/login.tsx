import styles from "../styles/login.module.css";
import LoadingModal from "../components/loadingModal";
import LoginButtonOAuth from "../components/loginButtonOAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormLabelControl from "../components/formLabelControl";
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase-config";
import { generateRandomString } from "../utils/generateRandomString";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
import { RedirectionUIProps } from "../components/redirectionUI";
import type { NextPage } from "next";

type LoginInfo = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [logInInfo, setLogInInfo] = useState<LoginInfo>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>(null);
  const [logInOrSignUp, setLogInOrSignUp] = useState<"Login" | "Signup">("Login");
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter()

  function signInWithGoogle() {
    document.cookie = "signInWithRedirect=true";
    setModalShow(true);
    signInWithRedirect(auth, new GoogleAuthProvider());
  }

  function signInWithGithub() {
    const antiCsrfToken = generateRandomString(10);
    const baseURI = "https://github.com/login/oauth/authorize";
    const paramClientID = "?client_id=" + process.env.NEXT_PUBLIC_GITHUB_ID
    const paramState = "&state=" + antiCsrfToken;

    setModalShow(true);
    document.cookie = "antiCsrfToken=" + antiCsrfToken;
    window.location.assign(baseURI + paramClientID + paramState);
  }

  function updateLogInInfo(event: ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement;

    setLogInInfo((prevLogInInfo) => {
      if (name === "email") {
        return {
          email: value,
          password: prevLogInInfo?.password,
        };
      } else if (name === "password") {
        return {
          email: prevLogInInfo?.email,
          password: value,
        };
      }
    });
  }

  function updateConfirmPassword(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement;

    setConfirmPassword(value);
  }

  function signInOrCreateUser() {
    setModalShow(true);
    getSignInOrCreateUser()(auth, logInInfo?.email, logInInfo?.password)
      .then(() => {
        router.push("/dashboard")
      })
      .catch((error) => {
        renderErrorOrRedirect(error);
        setModalShow(false);
      });

    function getSignInOrCreateUser() {
      if (logInOrSignUp === "Login") {
        return signInWithEmailAndPassword;
      } else {
        return createUserWithEmailAndPassword;
      }
    }

    function renderErrorOrRedirect(error: FirebaseError) {
      const frequentErrorSet = new Set(["auth/missing-email", "auth/invalid-email", "auth/wrong-password", "auth/weak-password"]);

      if (frequentErrorSet.has(error.code)) {
        setErrorMessage(error.message);
      } else {
        const redirectionUIProps: RedirectionUIProps = { title: error.code, message: error.message, pageToRedirect: "/login" }
        document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
        router.push("/redirection");
      }
    }
  }

  return (
    <div className={styles.container}>
      {errorMessage && <small className={styles.errorMessage}>{errorMessage}</small>}
      <Form>
        <FormLabelControl
          label="Email"
          onChange={updateLogInInfo}
        />
        <FormLabelControl
          label="Password"
          onChange={updateLogInInfo}
        />
        {logInOrSignUp === "Signup" && <FormLabelControl
          label="Confirm Password"
          type="password"
          onChange={updateConfirmPassword}
        />}

        <div className={styles.btnFormTextContainer}>
          <Button
            variant="primary"
            type="button"
            disabled={
              logInInfo?.password === confirmPassword || logInOrSignUp === "Login"
                ? false
                : true
            }
            onClick={signInOrCreateUser}
          >
            {logInOrSignUp}
          </Button>
          {(logInOrSignUp === "Login") && <Form.Text
            className={styles.notRegistered}
            onClick={() => {
              setLogInOrSignUp("Signup");
            }}
          >
            Not registered?
          </Form.Text>}
        </div>
      </Form>
      <div className={styles.OAuthContainer}>
        <LoginButtonOAuth
          provider="Google"
          signInWithProvider={signInWithGoogle}
          icon={<BsGoogle size={25} />}
        />
        <LoginButtonOAuth
          provider="Github"
          signInWithProvider={signInWithGithub}
          icon={<BsGithub size={25} />}
        />
      </div>
      <LoadingModal
        modalShow={modalShow}
      />
    </div>
  );
}

export default Login;