import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../styles/chat.module.css";
import Form from "react-bootstrap/Form";
import ChatBox from "../components/chatBox";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

type MessageIdData = {
  id: string;
  data: {
    text: string;
    userName: string;
    userImage: string;
    timestamp: number;
  }
}

function Chat() {
  const [textToBeSent, setTextToBeSent] = useState<string>("");
  const [messageArray, setMessageArray] = useState<MessageIdData[]>(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const querySnapshotDocs = querySnapshot.docs;
      const msgIdDataArray = querySnapshotDocs.map((doc) => {
        return (
          {
            id: doc.id,
            data: doc.data()
          }
        );
      });

      setMessageArray(msgIdDataArray as MessageIdData[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveMessage() {
    const docRef = await addDoc(collection(db, "messages"), {
      text: textToBeSent,
      timestamp: Date.now(),
      userName: currentUser !== null ? currentUser.displayName : "anonymous",
      userImage: currentUser !== null ? currentUser.photoURL : "",
    });

    console.log("Document written with ID: ", docRef.id);
  }

  return (
    messageArray &&
    <>
      <Card style={{ width: "100%", color: "black", marginTop: "80px" }}>
        <Card.Body>
          <Card.Text
            style={{ height: "400px" }}
            as="div"
            className="overflow-auto"
          >
            {messageArray?.map((message, index) => {
              const dayOfPreviousMsg = index && millisecondsToDate(messageArray[index - 1]?.data.timestamp).day;
              const dateOfCurrentMsg = millisecondsToDate(message.data.timestamp);

              return (
                <div key={index}>

                  {(index === 0 || (dayOfPreviousMsg !== dateOfCurrentMsg.day)) && (<div>{dateOfCurrentMsg.full}</div>)}

                  <ChatBox
                    key={`${index}${message.data.timestamp}`}
                    text={message.data.text}
                    userName={message.data.userName}
                    userImage={message.data.userImage}
                    sessionName={
                      currentUser !== null
                        ? currentUser.displayName
                        : "anonymous"
                    }
                    timestamp={message.data.timestamp}
                    index={index}
                    chatMessages={messageArray}
                    isLast={
                      messageArray.length - 1 === index ? "true" : "false"
                    }
                  />
                </div>
              );
            })}
          </Card.Text>

          <div className={styles.sendContainer}>
            <Form.Control type="text" onChange={(event) => {
              setTextToBeSent(event.target.value);
            }} value={textToBeSent} />
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
