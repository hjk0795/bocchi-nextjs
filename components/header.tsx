import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { RedirectionUIProps } from "./redirectionUI";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  var [isExecuted, setIsExecuted] = useState(false);
  let redirectionUIProps: RedirectionUIProps;

  function handleSignOut() {
    // try {
    //    signOut(auth);
    //   document.cookie = `isAuthenticated=false`;
    //   router.push("/login");
    // } catch (error) {
    //   console.log(error.message);
    // }
    signOut(auth).then(() => {
      redirectionUIProps = { title: "Signed out successfully.", pageToRedirect: "/", isAutoRedirect: true }
    }).catch((error) => {
      const currentURI = document.location.href;
      //currentURI - PARAMS = baseURI ?? => Test with JS fiddle (String - String)
      redirectionUIProps = { title: error.code, message: error.message, pageToRedirect: currentURI }
    }).finally(() => {
      document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
      router.push("/redirection");
    })
  }

  if (isExecuted === false) {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    setIsExecuted(true);
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
                {currentUser ? (
                  <Link href="/login">
                    <div onClick={handleSignOut}>
                      Sign out
                    </div>
                  </Link>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
