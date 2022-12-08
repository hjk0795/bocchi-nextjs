import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { generateRandomString } from "../utils/generateRandomString";

export default function CallbackEndpoint() {
  const router = useRouter();

  useEffect(() => {
    // const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
    let params = new URLSearchParams(document.location.search);
    const codeParam = params.get("code")
    // const stateParam = params.get("state")
    history.pushState({}, null, "newUrl");

    if (1 === 1) {
      if (codeParam) {
        try {
          handleCallback(codeParam);
        } catch (error) {
          console.error(`${error.name}: ${error.message}`);
        }
      }
    }
    else {
    }

    async function getAccessToken(codeParam: string): Promise<string> {
      const response = await fetch("http://localhost:3000/api/github/getAccessToken?code=" + codeParam, {
        method: "POST",
      })
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
      const accessToken = await getAccessToken(codeParam);
      await signIn(accessToken);
      // router.push("./dashboard");
      router.push("/dashboard");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Signing in..</h1>
    </>
  );
}

