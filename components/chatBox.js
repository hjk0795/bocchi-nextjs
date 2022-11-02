export default function ChatBox(props) {
  return (
    <>
   {/* {console.log(props.currentTime)} */}
      <span style={{ border: "1px solid black" }}>{props.text}</span>
      <span style={{ border: "1px solid black" }}>{props.hour}</span>
      <span style={{ border: "1px solid black" }}>{props.minute}</span>
      <br />
    </>
  );
}
