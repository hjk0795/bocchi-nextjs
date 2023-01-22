import styles from "../styles/header.module.css";
import Circle from "./circle";
import AlertToast from "./alertToast";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { RedirectionUIProps } from "./redirectionUI";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
import { User, onAuthStateChanged, signOut } from "firebase/auth";


import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Paper } from "@mui/material";

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
  const QUESTION_MARK_IMG = "https://cdn-icons-png.flaticon.com/512/84/84042.png";

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

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setIsDrawed(open);
      };

  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{display: 'none'}}
    >
      <Paper>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            {/* <Link href="/">bocchimeshi</Link> */}
            <Link href="/">brand</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link as="div" className="me-auto">
                <Link href="/chat">
                  Chat
                </Link>
              </Nav.Link>
              <Nav.Link as="div" className="me-auto">
                {currentUser ? <Link href="/#sign-out" onClick={signOutAndRedirect}>Sign Out</Link> :
                  <Link href="/login">Login</Link>}
              </Nav.Link> */}
              {currentUser ? <Nav.Link as="div" className="me-auto">




                <React.Fragment>
                  <Button onClick={toggleDrawer(true)}>
                    <Circle
                      height="30px"
                      width="30px"
                      lineHeight="30px"
                      backgroundImgURL={currentUser.photoURL}
                      hidden={false}
                    />
                  </Button>
                  {list()}
                  {/* <Drawer
                      anchor={'right'}
                      open={isDrawed}
                      onClose={toggleDrawer(false)}
                    >
                      {list()}
                    </Drawer> */}
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
              <div className={styles.alertToast}>
                <AlertToast
                  title={alertToastError?.title}
                  message={alertToastError?.message}
                  show={alertToast}
                  setShow={setAlertToast}
                />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;