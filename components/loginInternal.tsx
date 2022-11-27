import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./loginInternal.module.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from 'next/router'

export default function LoginInternal() {


  const [isRegistered, setIsRegistered] = useState(true);
  const [logInDetail, setLogInDetail] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter()

  function updateIsRegistered() {
    return setIsRegistered(!isRegistered);
  }

  function updateLogInDetail(event: KeyboardEvent): void {
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

  function updateConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  async function handleClick(email, password) {
    if (isRegistered) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard")
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={updateLogInDetail}
            value={logInDetail.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={updateLogInDetail}
            value={logInDetail.password}
            required
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          style={isRegistered ? { display: "none" } : { display: "block" }}
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
            value={confirmPassword}
          />
        </Form.Group>

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
            onClick={() => {
              handleClick(logInDetail.email, logInDetail.password);
            }}
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
