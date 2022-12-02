import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CallbackEndpoint() {
  const [queryString, setQueryString] = useState(null);
  const router = useRouter();

  async function getAccessToken(codeParam: string): Promise<string> {
    const response = await fetch(
      "http://localhost:3000/api/github/getAccessToken?code=" + codeParam,
      {
        method: "GET",
      }
    )
    const data = await response.json();
    const accessToken = data.access_token as string;

    return accessToken;
  }

  async function signIn(accessToken: string) {
    const credential = GithubAuthProvider.credential(
      accessToken
    );

    await signInWithCredential(auth, credential);
    document.cookie = `isAuthenticated=true`;
  }

  async function handleCallback(codeParam: string) {
    try {
      const accessToken = await getAccessToken(codeParam);
      await signIn(accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  }

  function* getQueryString() {
    yield null;
    return window.location.search;
  }



  const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
  const generator = getQueryString();
  !queryString && setQueryString(generator.next().value);
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");
  const stateParam = urlParams.get("state");

  if (stateParam === requestState) {
    if (codeParam) {
      handleCallback(codeParam);
    }
  }
  else {
  }



  return (
    <>
      <h1>Logging in...</h1>
    </>
  );
}
