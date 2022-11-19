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
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import YearMonthDay from "../components/yearMonthDay";
import { db, auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Chat() {
  const [message, setMessage] = useState("");
  var [chatMessages, setChatMessages] = useState([]);
  var [isExecuted, setIsExecuted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  if (isExecuted === false) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];

      querySnapshot.forEach((doc) => {
        var tempObject = {
          text: "",
          hour: 0,
          minute: 0,
          year: 0,
          month: 0,
          day: 0,
          userName: "",
          userImage: "",
          timestamp: 0,
        };

        tempObject.text = doc.data().text;
        tempObject.hour = doc.data().hour;
        tempObject.minute = doc.data().minute;
        tempObject.year = doc.data().year;
        tempObject.month = doc.data().month;
        tempObject.day = doc.data().day;
        tempObject.userName = doc.data().userName;
        tempObject.userImage = doc.data().userImage;
        tempObject.timestamp = doc.data().timestamp;
        temp.push(tempObject);
      });
      setChatMessages(temp);
      setIsExecuted(true);
    });
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  async function saveMessage() {
    const docRef = await addDoc(collection(db, "messages"), {
      text: `${message}`,
      timestamp: Date.now(),
      hour: parseInt(("0" + new Date().getHours()).slice(-2)),
      minute: parseInt(("0" + new Date().getMinutes()).slice(-2)),
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      userName: currentUser !== null ? currentUser.displayName : "anonymous",
      userImage: currentUser !== null ? currentUser.photoURL : "",
    });

    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <>
      <Card style={{ width: "100%", color: "black", marginTop: "80px" }}>
        <Card.Body>
          <Card.Text
            style={{ height: "400px" }}
            as="div"
            className="overflow-auto"
          >
            {chatMessages.map((foundItem, index) => {
              return (
                <div key={index}>
                  <YearMonthDay
                    key={`${foundItem.year}${foundItem.month}${foundItem.day}`}
                    year={foundItem.year}
                    month={foundItem.month}
                    day={foundItem.day}
                    chatMessages={chatMessages}
                    index={index}
                  />

                  <ChatBox
                    key={`${index}${foundItem.year}${foundItem.month}${foundItem.day}`}
                    text={foundItem.text}
                    hour={foundItem.hour}
                    minute={foundItem.minute}
                    userName={foundItem.userName}
                    userImage={foundItem.userImage}
                    sessionName={
                      currentUser !== null
                        ? currentUser.displayName
                        : "anonymous"
                    }
                    timestamp={foundItem.timestamp}
                    index={index}
                    chatMessages={chatMessages}
                    isLast={
                      chatMessages.length - 1 === index ? "true" : "false"
                    }
                  />
                </div>
              );
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

export default Chat;
