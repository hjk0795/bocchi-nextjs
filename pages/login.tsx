import styles from "../styles/login.module.css";
import LoginInternal from "../components/loginInternal";
import LoginExternal from "../components/loginExternal";
import LoadingModal from "../components/loadingModal";
import { RedirectionUIProps } from "../components/redirectionUI";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const router = useRouter();

  if (modalShow === true) {
    if (elapsedSeconds === 5) {
      const redirectionUIProps: RedirectionUIProps = { title: "Request Timeout", message: "API server does not respond", pageToRedirect: "/login", isAutoRedirect: true }
      document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
      router.push("/redirection");
    } else {
      setTimeout(() => {
        setElapsedSeconds(elapsedSeconds + 1);
      }, 1000);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <LoginInternal
        // setLoadingMessage={setLoadingMessage}
        />
        <LoginExternal
          setModalShow={setModalShow}
        />
        <LoadingModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setTimeout(() => {
              setElapsedSeconds(0);
            }, 1000);
          }}
          elapsedSeconds={elapsedSeconds}
        />
      </div>
    </>
  );
}
