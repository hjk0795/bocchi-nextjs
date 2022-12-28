import styles from "../styles/chatBox.module.css";
import Circle from "./circle";
import { millisecondsToDate } from "../utils/millisecondsToDate";
import { useEffect } from "react";

type ChatBoxProps = {
  renderingDirection: "left" | "right";
  text: string;
  userName: string;
  userImage: string;
  timestamp: number;
  isProfileHidden: boolean;
  isLast: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ renderingDirection, text, userName, userImage, timestamp, isProfileHidden, isLast }) => {
  const hours = millisecondsToDate(timestamp).hours;
  const minutes = millisecondsToDate(timestamp).minutes;

  useEffect(() => {
    isLast && document.getElementById("last").scrollIntoView(false);
  }, [isLast]);

  return (
    <>
      {renderingDirection === "right" ? (
        <div className={styles.renderingRight}>
          <small className={styles.hourMinutes}>{hours}:</small>
          <small className={styles.hourMinutes}>{minutes}</small>
          <span className={styles.text} style={{ marginLeft: "3px" }}> {text} </span>
          <br />
        </div>
      ) : (
        <div className={styles.renderingLeft}>
          <Circle
            height="30px"
            width="30px"
            lineHeight="30px"
            backgroundImgURL={userImage}
            hidden={isProfileHidden}
          />
          <div className={styles.nameTextContainer}>
            {!isProfileHidden && <small className={styles.userName}>{userName}</small>}

            <div>
              <span className={styles.text}>{text}</span>
              <small className={styles.hourMinutes} style={{ marginLeft: "3px" }}>{hours}:</small>
              <small className={styles.hourMinutes}>{minutes}</small>
            </div>
          </div>
          <br />
        </div>
      )}
      {isLast && <div id="last">{null}</div>}
    </>
  );
}

export default ChatBox;