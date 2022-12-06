import { auth } from "../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <>
      {currentUser === undefined ? <h1>Loading..</h1> : currentUser !== null ? <>
        <h6>{currentUser.displayName}</h6>
        <img width="100px" height="100px" src={currentUser.photoURL}></img>
      </> : <h1>Please login first</h1>}
    </>
  );
}
