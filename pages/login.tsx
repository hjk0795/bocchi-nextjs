import styles from "../styles/login.module.css";
import LoginInternal from "../components/loginInternal";
import LoginExternal from "../components/loginExternal";
import LoadingModal from "../components/loadingModal";
import { useState } from "react";

export default function Login() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <div className={styles.container}>
        <LoginInternal
          setModalShow={setModalShow}
        />
        <LoginExternal
          setModalShow={setModalShow}
        />
        <LoadingModal
          modalShow={modalShow}
        />
      </div>
    </>
  );
}
