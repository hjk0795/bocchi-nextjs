import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  var [isExecuted, setIsExecuted] = useState(false);

  async function signout() {
    try {
      await signOut(auth);
      document.cookie = `isAuthenticated=false`;
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
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
                  <div style={{ cursor: "pointer" }}>Chat</div>
                </Link>
              </Nav.Link>
              <Nav.Link as="div" className="me-auto">
                {currentUser ? (
                  <Link href="/login">
                    <div onClick={signout} style={{ cursor: "pointer" }}>
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
