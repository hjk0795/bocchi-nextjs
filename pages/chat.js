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
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
// import connectFirestore from "../utils/connectFirestore";
import { initializeApp } from "firebase/app";

function chat() {
  const [message, setMessage] = useState("");
  var [chatMessages, setChatMessages] = useState([]);
  var [isExecuted, setIsExecuted] = useState(false);

  const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: "bocchi-cd32c.firebaseapp.com",
    databaseURL:
      "https://bocchi-cd32c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bocchi-cd32c",
    storageBucket: "bocchi-cd32c.appspot.com",
    messagingSenderId: "429017394127",
    appId: "1:429017394127:web:97bf9a991af175637340ba",
    measurementId: "G-HW15LB2E2F",
  };

  if (isExecuted === false) {
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    const db = getFirestore(app);
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      
      querySnapshot.forEach((doc) => {
        var tempObject = {
            text: "",
            timestamp: ""
          };

        tempObject.text = doc.data().text,
        tempObject.timestamp = doc.data().timestamp.toString()
        temp.push(tempObject);
      });

      console.log("Triggered");
      console.log(temp);
      setChatMessages(temp);
      setIsExecuted(true);
    });
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function saveMessage() {
    // const [app, db] = await connectFirestore();
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "messages"), {
      text: `${message}`,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <>
      <Card style={{ width: "100%", color: "black", marginTop: "80px" }}>
        <Card.Body>
          <Card.Text style={{ height: "400px" }}>
            {chatMessages.map((foundItem, index) => {
              return <ChatBox key={index} text={foundItem.text} timestamp={foundItem.timestamp} />;
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
