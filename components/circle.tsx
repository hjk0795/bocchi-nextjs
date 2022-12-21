import styles from "../styles/circle.module.css";

type CircleProps = {
  hidden: boolean;
  width: string;
  height: string;
  lineHeight: string;
  backgroundImgURL?: string;
}

export default function Circle({ hidden, width, height, lineHeight, backgroundImgURL }: CircleProps) {
  return (
    <>
      <div
        className={styles.circle}
        style={{
          width: width,
          height: height,
          lineHeight: lineHeight,
          border: hidden ? "1px solid white" : "1px solid black",
          backgroundImage: hidden ? "" : `url(${backgroundImgURL})`
        }}
      ></div>
    </>
  );
}
