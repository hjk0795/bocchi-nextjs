import styles from "../styles/header.module.css";
import Circle from "./circle";
import AlertToast from "./alertToast";
import React from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemSet from "./listItemSet";
import { RedirectionUIProps } from "./redirectionUI";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import { BsFillChatFill } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { FirebaseError } from "firebase/app";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

type AlertToastError = {
  title: string,
  message: string
}

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [alertToast, setAlertToast] = useState<boolean>(false);
  const [alertToastError, setAlertToastError] = useState<AlertToastError>(null);
  const [isDrawed, setIsDrawed] = useState<boolean>(false);
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
    signOut(auth)
      .then(() => {
        document.cookie = "isAuthenticated=true" + ";max-age=0";

        const redirectionUIProps: RedirectionUIProps = { title: "Signed out successfully.", pageToRedirect: "/", isAutoRedirect: true };
        document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
        router.push("/redirection");
      }).catch((error: FirebaseError) => {
        setAlertToast(true);
        setAlertToastError({ title: error.code, message: error.message });
      })
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/">brand</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className={`${styles.collapsed} me-auto`}>
              <Nav className="ms-auto">
                <Nav.Link as="div" className="me-auto">
                  <Link href="/chat">
                    Chat
                  </Link>
                </Nav.Link>
                <Nav.Link as="div" className="me-auto">
                  {currentUser ? <Link href="#signout" onClick={signOutAndRedirect}>Sign Out</Link> : <Link href="/login">Login</Link>}
                </Nav.Link>
              </Nav>
            </div>
            <div className={`${styles.notCollapsed} ms-auto`}>
              <Nav className="ms-auto">
                {currentUser ? <Nav.Link as="div" className={`${styles.drawer} me-auto`}>
                  <React.Fragment>
                    <Button onClick={() => setIsDrawed(!isDrawed)}>
                      <Circle
                        height="30px"
                        width="30px"
                        lineHeight="30px"
                        backgroundImgURL={currentUser.photoURL}
                        hidden={false}
                      />
                    </Button>
                    {isDrawed && <Paper className={styles.dropdown}>
                      <List>
                        <ListItemSet text="Chat" icon={<BsFillChatFill />} handleClick={() => router.push('/chat')} />
                        <ListItemSet text="Sign Out" icon={<GoSignOut />} handleClick={signOutAndRedirect} />
                      </List>
                    </Paper>}
                  </React.Fragment>
                </Nav.Link> : <><Nav.Link as="div" className="me-auto">
                  <Link href="/chat">
                    Chat
                  </Link>
                </Nav.Link>
                  <Nav.Link as="div" className="me-auto">
                    <Link href="/login">Login</Link>
                  </Nav.Link></>
                }
              </Nav>
            </div>
            <div className={styles.alertToast}>
              <AlertToast
                title={alertToastError?.title}
                message={alertToastError?.message}
                show={alertToast}
                setShow={setAlertToast}
              />
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;