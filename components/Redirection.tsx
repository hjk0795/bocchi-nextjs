import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  message: string,
  seconds: number,
  pageToRedirect: string
}

export default function Redirection({ message, seconds, pageToRedirect }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);
  const router = useRouter();

  remainingSeconds === 0 ? router.push(pageToRedirect) :
    setTimeout(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

  return (
    <>
      <h1>{`${message} This page will be redirected to ${pageToRedirect} page within ${remainingSeconds} seconds`}</h1>
    </>
  );
}
