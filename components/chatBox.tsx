import styles from "./chatBox.module.css";
import Circle from "./circle";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { useEffect } from "react";

type ChatBoxProps = {
  text: string;
  userName: string;
  userImage: string;
  sessionName: string;
  timestamp: number;
  index: number;
  chatMessages: any[];
  isLast: boolean;
}

export default function ChatBox(props) {
  useEffect(() => {
    document.getElementById("last").scrollIntoView(false);
  }, []);

  var hidden = false;
  if (props.index === 0) {
    var lastTimestamp = props.chatMessages[props.index].timestamp;
  } else {
    var lastTimestamp = props.chatMessages[props.index - 1].timestamp;
  }

  var timeGap = props.timestamp - lastTimestamp;

  if (props.index !== 0 && timeGap < 180000) {
    if (props.chatMessages[props.index - 1].userName === props.userName) {
      hidden = true;
    }
  }

  return (
    <>
      {props.userName === props.sessionName ? (
        <div className="d-flex justify-content-end align-items-center" style={{marginBottom: "3px"}}>
          <small
            style={{
              border: "0px solid black",
              fontSize: "10px",
              color: "gray",
            }}
          >
            {props.hour}:
          </small>
          <small
            style={{
              border: "0px solid black",
              fontSize: "10px",
              color: "gray",
              marginRight: "3px",
            }}
          >
            {props.minute}
          </small>
          <span style={{ border: "1px solid black", borderRadius: "15%" }}>
            {props.text}
          </span>
          <br />
        </div>
      ) : (
        <div className="d-flex justify-content-start align-items-top">
          <Circle
            height="30px"
            width="30px"
            lineHeight="30px"
            backgroundImgURL={props.userImage}
            hidden={hidden}
          />
          <div
            className={`d-flex flex-column align-items-start ${styles.message}`}
          >
            {hidden ? null : (
              <small className={styles.userName}>{props.userName}</small>
            )}

            <div style={{ marginTop: hidden ? "6px" : "" }}>
              <span
                style={{
                  border: "1px solid black",
                  borderRadius: "15%",
                  padding: "3px",
                }}
              >
                {props.text}
              </span>
              <small
                style={{
                  border: "0px solid black",
                  fontSize: "10px",
                  color: "gray",
                  marginLeft: "3px",
                }}
              >
                {props.hour}:
              </small>
              <small
                style={{
                  border: "0px solid black",
                  fontSize: "10px",
                  color: "gray",
                }}
              >
                {props.minute}
              </small>
            </div>
          </div>
          <br />
        </div>
      )}
      {props.isLast === "true" && <div id="last"></div>}
    </>
  );
}
