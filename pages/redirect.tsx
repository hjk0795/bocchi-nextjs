import { useRouter } from "next/router";

export default function Redirect() {
  const router = useRouter();

  setTimeout(() => {
    console.log("Delayed for 1 second.");

    router.push("/dashboard");
  }, 1000);

  return (
    <>
      <h1>Redirecting...</h1>
    </>
  );
}
