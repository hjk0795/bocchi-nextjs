import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Header(props) {
  const router = useRouter();

  async function signout() {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
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
                <Link href="/chat"><div style={{cursor: "pointer"}}>Chat</div></Link>
              </Nav.Link>
              <Nav.Link as="div" className="me-auto">
                {props.userGlobal == null ? (
                  <Link href="/login">Login</Link>
                ) : (
                  <Link href="/login">
                    <div onClick={signout} style={{cursor: "pointer"}}>Sign out</div>
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
