import styles from "./circle.module.css";

export default function Circle(props) {
  return (
    <>
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
    </>
  );
}
