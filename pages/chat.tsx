import styles from "../styles/chat.module.css";
import ChatBox from "../components/chatBox";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { useState, useEffect } from "react";
import { NextPage } from "next/types";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

type MessageIdData = {
  id: string;
  data: {
    text: string;
    userName: string;
    userImage: string;
    timestamp: number;
  }
}

const Chat: NextPage = () => {
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
      <Card className={styles.container}>
        <Card.Body>
          <div className={`${styles.historyContainer} overflow-auto`}>
            {messageArray?.map((message, index) => {
              const prevMessage = index && messageArray[index - 1];
              let isProfileHidden = false;

              if (index !== 0 && (message.data.timestamp - prevMessage.data.timestamp < 180000)) {
                if (prevMessage.data.userName === message.data.userName) {
                  isProfileHidden = true;
                }
              }

              const dayOfPreviousMsg = index && millisecondsToDate(prevMessage.data.timestamp).day;
              const dateOfCurrentMsg = millisecondsToDate(message.data.timestamp);

              return (
                <div key={index}>
                  {(index === 0 || (dayOfPreviousMsg !== dateOfCurrentMsg.day)) && (<div>{dateOfCurrentMsg.full}</div>)}

                  <ChatBox
                    key={`${index}${message.data.timestamp}`}
                    renderingDirection={
                      message.data.userName === currentUser?.displayName
                        ? "right"
                        : "left"
                    }
                    text={message.data.text}
                    userName={message.data.userName}
                    userImage={message.data.userImage}
                    timestamp={message.data.timestamp}
                    isProfileHidden={isProfileHidden}
                    isLast={
                      (messageArray.length - 1) === index ? true : false
                    }
                  />
                </div>
              );
            })}
          </div>

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
