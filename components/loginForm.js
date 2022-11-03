import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./loginForm.module.css";

export default function Login() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [logInDetail, setLogInDetail] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  function updateIsRegistered() {
    return setIsRegistered(!isRegistered);
  }

  function updateLogInDetail(event) {
    const { name, value } = event.target;

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

  return (
    <div>
      <Form action={isRegistered ? "/api/login" : "/api/signup"} method="post">
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
            type="submit"
            name={isRegistered ? "Login" : "Signup"}
            disabled={
              logInDetail.password === confirmPassword || isRegistered === true
                ? false
                : true
            }
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
    </div>
  );
}
