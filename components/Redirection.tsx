import styles from "../styles/redirection.module.css"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  title: string,
  message?: string,
  pageToRedirect?: string,
  isAutoRedirect?: boolean
}

export default function Redirection({ title, message = null, pageToRedirect = "previous", isAutoRedirect = false }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const router = useRouter();
  const autoRedirectMessage = `This page will be redirected to the ${pageToRedirect} page within ${remainingSeconds} seconds.`;
  const routerBackOrPush = (pageToRedirect: string) => {
    if (pageToRedirect === "previous") {
      return router.back();
    } else {
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
      <h1>{title}</h1><hr />
      {message && <div>{message}</div>}<br />
      {isAutoRedirect ? <small className={styles.autoRedirectMessage}>{autoRedirectMessage}</small> :
        <Button variant="dark" onClick={() => routerBackOrPush(pageToRedirect)}>Back to the {pageToRedirect} page</Button>}
    </>
  );
}