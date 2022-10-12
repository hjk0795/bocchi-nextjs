import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

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
                {session === null ? (
                  <Link href="/login">Log in</Link>
                ) : (
                  <div style={{cursor: "pointer"}}
                    onClick={() => {
                      signOut({ callbackUrl: "http://localhost:3000/login" });
                    }}
                  >
                    Sign out
                  </div>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

// {session && (
//   <>
//     <p>
//       Welcome, {session.user.name ?? session.user.email}
//     </p>
//     <br />
//     <img src={session.user.image} alt="" />
//   </>
// )}
// {!session && (
//   <>
//     <p>Please Sign in</p>
//   </>
// )}
