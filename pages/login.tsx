import LoginInternal from "../components/loginInternal";
import LoginExternal from "../components/loginExternal";
import styles from "../styles/login.module.css";

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <LoginInternal />
        <LoginExternal />
      </div>
    </>
  );
}
