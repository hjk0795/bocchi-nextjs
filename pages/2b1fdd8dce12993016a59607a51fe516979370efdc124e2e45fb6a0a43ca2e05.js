import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CallbackEndpoint() {
  const router = useRouter();
  useEffect(() => {
    const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    const stateParam = urlParams.get("state");

    if (stateParam === requestState) {
      if (codeParam) {
        async function getAccessToken() {
          await fetch(
            "http://localhost:3000/api/github/getAccessToken?code=" + codeParam,
            {
              method: "GET",
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const credential = GithubAuthProvider.credential(
                data.access_token
              );
              signInWithCredential(auth, credential);
              router.push("/dashboard");
            });
        }

        getAccessToken();
      }
    }
  }, []);

  return <>
    <h1>Logging in...</h1>
  </>;
}
