import styles from "./chatBox.module.css";
import Circle from "./circle";

export default function ChatBox(props) {
  return (
    <>
      <div
        className={
          props.userName === props.sessionName
            ? "d-flex justify-content-end align-items-center"
            : "d-flex justify-content-start align-items-center"
        }
      >
        {props.userName === props.sessionName ? (
          ""
        ) : (
          <Circle
            height="30px"
            width="30px"
            lineHeight="30px"
            backgroundImage={props.userImage}
          />
        )}

        {props.userName === props.sessionName ? (
          <>
            <small style={{ border: "1px solid black" }}>{props.hour}</small>
            <small style={{ border: "1px solid black" }}>{props.minute}</small>
            <span style={{ border: "1px solid black", borderRadius: "15%" }}>
              {props.text}
            </span>
          </>
        ) : (
          <>
            <span style={{ border: "1px solid black", borderRadius: "15%" }}>
              {props.text}
            </span>
            <small style={{ border: "1px solid black" }}>{props.hour}</small>
            <small style={{ border: "1px solid black" }}>{props.minute}</small>
          </>
        )}
        <br />
      </div>
    </>
  );
}
