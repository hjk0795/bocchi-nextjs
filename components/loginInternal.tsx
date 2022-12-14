import styles from "../styles/loginInternal.module.css";
import FormLabelControl from "./formLabelControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RedirectionUIProps } from "./redirectionUI";
import { useState, ChangeEvent } from "react";
import { useRouter } from 'next/router'
import { auth } from "../firebase-config";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

type LoginInfo = {
  email: string,
  password: string
};

export default function LoginInternal() {
  const [logInInfo, setLogInInfo] = useState<LoginInfo>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>(null);
  const [logInOrSignUp, setLogInOrSignUp] = useState<"Login" | "Signup">("Login");
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const router = useRouter()

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
    getSignInOrCreateUser()(auth, logInInfo?.email, logInInfo?.password)
      .then(() => {
        router.push("/dashboard")
      })
      .catch((error) => {
        renderErrorOrRedirect(error);
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
    <>
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

        <div className={styles.bottomContainer}>
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
    </>
  );
}
