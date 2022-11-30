import { auth } from "../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  var [isExecuted, setIsExecuted] = useState(false);
  const router = useRouter();

  if (isExecuted === false) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsExecuted(true);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }

  const displayName = currentUser != null ? currentUser.displayName : "Loading";
  const photoURL = currentUser != null ? currentUser.photoURL : "";

  return (
    <>
      {currentUser !== null ? (
        <>
          <h6>{displayName}</h6>
          <img width="100px" height="100px" src={photoURL}></img>
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
}
