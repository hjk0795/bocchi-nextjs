import styles from "./circle.module.css";

export default function Circle(props) {
  return (
    <>
      {props.hidden === "true" ? (
        <div
          className={styles.circle}
          style={{
            height: props.height,
            width: props.width,
            lineHeight: props.lineHeight,
            backgroundImage: "",
            border: "1px solid white",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        <div
          className={styles.circle}
          style={{
            height: props.height,
            width: props.width,
            lineHeight: props.lineHeight,
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
    </>
  );
}
