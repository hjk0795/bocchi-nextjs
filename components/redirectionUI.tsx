import styles from "../styles/redirectionUI.module.css"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useRouter } from "next/router";

export type RedirectionUIProps = {
  title: string,
  message?: string,
  pageToRedirect?: string,
  isAutoRedirect?: boolean
}

const RedirectionUI: React.FC<RedirectionUIProps> = ({ title, message = null, pageToRedirect = "previous", isAutoRedirect = false }) => {
  (pageToRedirect === "/") && (pageToRedirect = "main");

  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const router = useRouter();
  const autoRedirectMessage = `This page will be redirected to the ${pageToRedirect} page within ${remainingSeconds} seconds.`;
  const routerBackOrPush = (pageToRedirect: string) => {
    if (pageToRedirect === "previous") {
      return router.back();
    } else {
      (pageToRedirect === "main") && (pageToRedirect = "/");
      return router.push(pageToRedirect);
    }
  }

  if (isAutoRedirect) {
    if (remainingSeconds === 0) {
      routerBackOrPush(pageToRedirect);
    } else {
      setTimeout(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);
    }
  }

  return (
    <>
      <h1 data-cy="title">{title}</h1><hr />
      {message && <div data-cy="message">{message}</div>}<br />
      {isAutoRedirect ? <small className={styles.autoRedirectMessage} data-cy="autoRedirectMessage">{autoRedirectMessage}</small> :
        <Button variant="dark" onClick={() => routerBackOrPush(pageToRedirect)}>Back to the {pageToRedirect} page</Button>}
    </>
  );
}

export default RedirectionUI;