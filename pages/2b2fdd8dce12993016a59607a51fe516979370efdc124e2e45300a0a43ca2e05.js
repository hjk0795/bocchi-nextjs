import { TwitterAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CallbackEndpointTwitter() {
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tokenParam = urlParams.get("oauth_token");
    const verifierParam = urlParams.get("oauth_verifier");
    const params =
      "?oauth_token=" + tokenParam + "&oauth_verifier=" + verifierParam;

    async function getAccessToken() {
      await fetch("http://localhost:3000/api/twitter/getAccessToken" + params, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          document.cookie = `isAuthenticated=true`;

          var tempArray = data.split("&");
          var oauthToken = tempArray[0].split("=")[1];
          var oauthTokenSecret = tempArray[1].split("=")[1];

          var credential = TwitterAuthProvider.credential(
            oauthToken,
            oauthTokenSecret
          );
          signInWithCredential(auth, credential);
        })
        .then(router.push("/dashboard"));
    }

    getAccessToken();
  }, []);

  return (
    <>
      <h1>Logging in...</h1>
    </>
  );
}
