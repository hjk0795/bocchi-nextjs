import { auth } from "../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User>(auth.currentUser);
  // var [isExecuted, setIsExecuted] = useState(false);
  // const router = useRouter();

  console.log("A");
  // if (isExecuted === false) {
    // onAuthStateChanged(auth, (user) => {
    //   console.log("B");
    //   if (user) {
        // setIsExecuted(true);
        // setCurrentUser(user);
        // console.log("C");
       
        
      // } else {
   
      //   console.log("D");
        // setCurrentUser(null);
       
    //   }
    // });
  // }
  console.log("E");

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
