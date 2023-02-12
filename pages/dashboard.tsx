import Image from "next/legacy/image";
import { RedirectionUIProps } from "../components/redirectionUI";
import { getDocIdDataArray } from "../utils/getDocIdDataArray";
import { auth, db } from "../firebase-config";
import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, query, where } from "firebase/firestore";

const Dashboard: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const router = useRouter();
  const QUESTION_MARK_IMG = "https://cdn-icons-png.flaticon.com/512/84/84042.png";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        checkUserEntry(user);

      } else {
        const redirectionUIProps: RedirectionUIProps = { title: "Please login first", pageToRedirect: "/login", isAutoRedirect: true }
        document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
        router.push("/redirection");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUserEntry(user: User) {
    const q1 = query(
      collection(db, "users"),
      where("email", "==", `${user.email}`)
    );
    const userIdDataArray = await getDocIdDataArray(q1);
    const userIdData = userIdDataArray[0];

    if (!userIdData) {
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        favoriteList: []
      });
      console.log("Document written with ID: ", docRef.id);
    }
  }

  return (
    <>
      {currentUser !== null && <>
        <h6>{currentUser.displayName ? currentUser.displayName : currentUser.email}</h6>
        <Image
          src={currentUser.photoURL ? currentUser.photoURL : QUESTION_MARK_IMG}
          alt="Profile image"
          width={100}
          height={100}
          priority
        />
      </>}
    </>
  );
}

export default Dashboard;