import LoginInternal from "../components/loginInternal";
import LoginExternal from "../components/loginExternal";
import styles from "../styles/login.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     router.push("/dashboard");
  //   } else {
  //     console.log("signing in..");
  //   }
  // });

  return (
    <>
      <div className={styles.container}>
        <LoginInternal />
        <LoginExternal />
      </div>
    </>
  );
}
