import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  function handleSubmit() {
    if (isRegistered === false) {
      if (logInDetail.password === confirmPassword) {
        alert("Signup");
      } else {
        alert("Check your password");
      }
    } else {
      alert("login");
    }
  }

  return (
    <div>
      <Form action="/api/login" method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={updateLogInDetail}
            value={logInDetail.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={updateLogInDetail}
            value={logInDetail.password}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={isRegistered ? { display: "none" } : { display: "block" }}
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          name={isRegistered ? "Login" : "Signup"}
        >
          {isRegistered ? "Login" : "Signup"}
        </Button>
        <Form.Text className="text-muted" onClick={updateIsRegistered}>
          Not registered?
        </Form.Text>
      </Form>
    </div>
  );
}
