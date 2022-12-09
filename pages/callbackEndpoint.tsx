import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";

export default function CallbackEndpoint() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const paramsCodeValue = params.get("code")
    const paramsStateValue = params.get("state")
    const antiCsrfToken = sessionStorage.getItem("antiCsrfToken");

    sessionStorage.removeItem("antiCsrfToken");

    if (paramsStateValue === antiCsrfToken) {
      if (paramsCodeValue) {
        try {
          handleCallback(paramsCodeValue);
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

      router.push("./dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Signing in..</h1>
    </>
  );
}

