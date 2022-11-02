export default function ChatBox(props) {
  return (
    <>
   {console.log(props.currentTime)}
      <span style={{ border: "1px solid black" }}>{props.text}</span>
      <span style={{ border: "1px solid black" }}>{props.timestamp.slice(18, 28)}</span>
      <br />
    </>
  );
}
