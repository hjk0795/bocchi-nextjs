import Image from 'next/image'
import { RedirectionUIProps } from "../components/redirectionUI";
import { auth } from "../firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        const redirectionUIProps: RedirectionUIProps = { title: "Please login first", pageToRedirect: "/login", isAutoRedirect: true }
        document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
        router.push("/redirection");
      }
    });
  }, []);

  return (
    <>
      {currentUser === undefined ? <h1>Loading..</h1> : currentUser !== null && <>
        <h6>{currentUser.displayName}</h6>
        <Image
          src={currentUser.photoURL}
          alt="Profile image"
          width={100}
          height={100}
          priority
        />
      </>}
    </>
  );
}
