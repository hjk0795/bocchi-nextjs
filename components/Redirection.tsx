import { useRouter } from "next/router";
import { useState } from "react";

export default function Redirection() {
  const [remainingSeconds, setRemainingSeconds] = useState(3);
  const router = useRouter();

  remainingSeconds === 0 ? router.push("/login") :
    setTimeout(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

  return (
    <>
      <h1>{`Authentication required. This page will be redirected to login page within ${remainingSeconds} seconds`}</h1>
    </>
  );
}
