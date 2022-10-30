import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/chat.module.css";
import Form from "react-bootstrap/Form";
import ChatBox from "../components/chatBox";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
// import connectFirestore from "../utils/connectFirestore";
import { initializeApp } from "firebase/app";

function chat() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  //   const firebaseConfig = {
  //     apiKey: process.env.API_KEY_FIREBASE,
  //     authDomain: "bocchi-cd32c.firebaseapp.com",
  //     databaseURL:
  //       "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
  //     projectId: "bocchi-cd32c",
  //     storageBucket: "bocchi-cd32c.appspot.com",
  //     messagingSenderId: "429017394127",
  //     appId: "1:429017394127:web:97bf9a991af175637340ba",
  //     measurementId: "G-HW15LB2E2F",
  //   };
//   useEffect(() => {
//     const firebaseConfig = {
//       apiKey: process.env.API_KEY_FIREBASE,
//       authDomain: "bocchi-cd32c.firebaseapp.com",
//       databaseURL:
//         "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
//       projectId: "bocchi-cd32c",
//       storageBucket: "bocchi-cd32c.appspot.com",
//       messagingSenderId: "429017394127",
//       appId: "1:429017394127:web:97bf9a991af175637340ba",
//       measurementId: "G-HW15LB2E2F",
//     };

//     const app = initializeApp(firebaseConfig);
//     // const analytics = getAnalytics(app);
//     const db = getFirestore(app);

//     const q = query(collection(db, "messages"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const temp = [];
//       querySnapshot.forEach((doc) => {
//         temp.push(doc.data().text);
//       });
//       chatMessages = temp;

//       console.log(chatMessages);
      
//     });


//     setChatMessages(["test", "test2"]);

//   }, []);

  //   const app = initializeApp(firebaseConfig);
  //   // const analytics = getAnalytics(app);
  //   const db = getFirestore(app);

  //   const q = query(collection(db, "messages"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const temp = [];
  //     querySnapshot.forEach((doc) => {
  //       chatMessages.push(doc.data().text);
  //     });
  //       chatMessages.push(temp);
  //     setChatMessages(chatMessages);
  //  console.log(chatMessages)
  //   });

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function saveMessage() {
    // const [app, db] = await connectFirestore();
    const docRef = await addDoc(collection(db, "messages"), {
      text: `${message}`,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <>
      <Card style={{ width: "100%", color: "black", marginTop: "80px" }}>
        <Card.Body>
          <Card.Text style={{ height: "400px" }}>
            {console.log("test")}
            {chatMessages.map((chat, index) => {
              <ChatBox key={index} text={chat} />;
            })}
          </Card.Text>
          <div className={styles.sendContainer}>
            <Form.Control type="text" onChange={handleChange} value={message} />
            <Button
              className={styles.sendButton}
              variant="outline-dark"
              size="sm"
              onClick={saveMessage}
            >
              Send
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default chat;
