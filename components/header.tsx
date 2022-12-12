import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { setCookieRedirection } from "../utils/setCookieRedirection";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  var [isExecuted, setIsExecuted] = useState(false);

  function handleSignOut() {
    // try {
    //    signOut(auth);
    //   document.cookie = `isAuthenticated=false`;
    //   router.push("/login");
    // } catch (error) {
    //   console.log(error.message);
    // }
    signOut(auth).then(() => {
      setCookieRedirection("Signed out successfully.", "/");
    }).catch((error) => {
      const currentURI = document.location.href;
      setCookieRedirection(error, currentURI);
    });
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
