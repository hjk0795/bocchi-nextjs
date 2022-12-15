import styles from "../styles/header.module.css";
import AlertToast from "./alertToast";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { RedirectionUIProps } from "./redirectionUI";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [alertToast, setAlertToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function signOutAndRedirect() {
    // signOut(auth).then(() => {
    //   setCurrentUser(null);
    //   document.cookie = "isAuthenticated=true" + ";max-age=0";

    //   const redirectionUIProps: RedirectionUIProps = { title: "Signed out successfully.", pageToRedirect: "/", isAutoRedirect: true };
    //   document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
    //   router.push("/redirection");
    // }).catch((error) => {

    // })
    try {
      throw new Error("test");
    } catch (error) {
      setAlertToast(true);
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/">bocchimeshi</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as="div" className="me-auto">
                <Link href="/chat">
                  Chat
                </Link>
              </Nav.Link>
              <Nav.Link as="div" className="me-auto">
                {currentUser ? <Link href="/#sign-out" onClick={signOutAndRedirect}>Sign Out</Link> :
                  <Link href="/login">Login</Link>}
              </Nav.Link>
              <div className={styles.alertToast}>
                <AlertToast />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
