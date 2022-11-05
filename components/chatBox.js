import styles from "./chatBox.module.css";
import Circle from "./circle";

export default function ChatBox(props) {
  var flag = 0;
  if (props.index === 0) {
    var lastTimestamp = props.chatMessages[props.index].timestamp;
  } else {
    var lastTimestamp = props.chatMessages[props.index - 1].timestamp;
  }

  var timeGap = props.timestamp - lastTimestamp;

  if (props.index!==0 && timeGap < 180000) {
    flag = 1;
  }

  return (
    <>
      {props.userName === props.sessionName ? (
        <div className="d-flex justify-content-end align-items-center">
          <small style={{ border: "1px solid black" }}>{props.hour}</small>
          <small style={{ border: "1px solid black" }}>{props.minute}</small>
          <span style={{ border: "1px solid black", borderRadius: "15%" }}>
            {props.text}
          </span>
          <br />
        </div>
      ) : (
        <>
          {flag === 1 ? (
            <>
              <div style={{marginRight: "268px"}}>
                <span
                  style={{
                    border: "1px solid black",
                    borderRadius: "15%",
                    padding: "3px",
                  }}
                >
                  {props.text}
                </span>
                <small style={{ border: "1px solid black", fontSize: "10px" }}>
                  {props.hour}
                </small>
                <small style={{ border: "1px solid black", fontSize: "10px" }}>
                  {props.minute}
                </small>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-start align-items-top">
                <Circle
                  height="30px"
                  width="30px"
                  lineHeight="30px"
                  backgroundImage={props.userImage}
                />
                <div
                  className={`d-flex flex-column align-items-start ${styles.message}`}
                >
                  <small className={styles.userName}>{props.userName}</small>

                  <div>
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
                      style={{ border: "1px solid black", fontSize: "10px" }}
                    >
                      {props.hour}
                    </small>
                    <small
                      style={{ border: "1px solid black", fontSize: "10px" }}
                    >
                      {props.minute}
                    </small>
                  </div>
                </div>
                <br />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
