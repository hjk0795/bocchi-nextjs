import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../styles/loginInternal.module.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from 'next/router'
import FormLabelControl from "./formLabelControl";

export default function LoginInternal() {
  const [logInDetail, setLogInDetail] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const router = useRouter()

  function updateLogInDetail(event: ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement;

    setLogInDetail((prevLogInDetail) => {
      if (name === "email") {
        return {
          email: value,
          password: prevLogInDetail.password,
        };
      } else if (name === "password") {
        return {
          email: prevLogInDetail.email,
          password: value,
        };
      }
    });
  }

  function updateConfirmPassword(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement;

    setConfirmPassword(value);
  }

  async function signInOrCreateAccount(event: React.MouseEvent) {
    if (isRegistered) {
      try {
        await signInWithEmailAndPassword(auth, logInDetail.email, logInDetail.password);
        router.push("/dashboard")
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(
          auth,
          logInDetail.email,
          logInDetail.password
        );
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
    }
  }

  function updateIsRegistered(event: React.MouseEvent) {
    return setIsRegistered(!isRegistered);
  }

  return (
    <>
      <Form>
        <FormLabelControl
          label="Email"
          onChange={updateLogInDetail}
        />
        <FormLabelControl
          label="Password"
          onChange={updateLogInDetail}
        />
        <div style={isRegistered ? { display: "none" } : { display: "block" }}>
          <FormLabelControl
            label="Confirm Password"
            type="password"
            onChange={updateConfirmPassword}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="primary"
            type="button"
            name={isRegistered ? "Login" : "Signup"}
            disabled={
              logInDetail.password === confirmPassword || isRegistered === true
                ? false
                : true
            }
            onClick={signInOrCreateAccount}
          >
            {isRegistered ? "Login" : "Signup"}
          </Button>
          <Form.Text
            className={`text-muted ${styles.notRegistered}`}
            onClick={updateIsRegistered}
          >
            Not registered?
          </Form.Text>
        </div>
      </Form>
    </>
  );
}
