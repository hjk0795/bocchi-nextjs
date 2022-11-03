import { useSession } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import styles from "../styles/dashboard.module.css";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // const firebaseConfig = {
  //   apiKey: process.env.API_KEY_FIREBASE,
  //   authDomain: "bocchi-cd32c.firebaseapp.com",
  //   databaseURL:
  //     "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "bocchi-cd32c",
  //   storageBucket: "bocchi-cd32c.appspot.com",
  //   messagingSenderId: "429017394127",
  //   appId: "1:429017394127:web:97bf9a991af175637340ba",
  //   measurementId: "G-HW15LB2E2F",
  // };

  // const app = initializeApp(firebaseConfig);
  // // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  // async function handleChange(e) {
  //   const value = e.target.value;
  //   const q = query(collection(db, "users"), where("name", "==", value));
    

  //   const querySnapshot = await getDocs(q);
  //   const querySnapshotDocs = querySnapshot.docs;

  
  //   const docArray = querySnapshotDocs.map((doc, index) => {
  //     return doc.data();
  //   });
  // }

  return (
    <>
      <h1>dashboard page</h1>
      <AiOutlineSearch style={{ width: "50px", height: "50px" }} />

      <div className={styles.sendContainer}>
        <Form.Control
          type="text"
          placeholder="Search user"
          // onChange={handleChange}
        />
      </div>

      {loading && <div>Loading...</div>}
      {session && (
        <>
          <p>Welcome, {session.user.name ?? session.user.email}</p>
          <br />
          <img src={session.user.image} alt="" />
        </>
      )}
      {!session && (
        <>
          <p>Please Sign in</p>
        </>
      )}
    </>
  );
}
