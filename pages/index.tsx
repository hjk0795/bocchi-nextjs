import styles from "../styles/home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.contents}>
        <h1>
          The elegant act of eating food <br /> without being disturbed by
          anyone
        </h1>
        <div>
          <Link href="/category" className={styles.buttonLink}>
            <button
              type="button"
              className={`${styles.startButton} btn btn-outline-dark btn-lg`}
            >
              Start
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
