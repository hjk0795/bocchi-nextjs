import LoadingModal from "../components/loadingModal";
import { RedirectionUIProps } from "../components/redirectionUI";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { FirebaseError } from "firebase/app";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";


const CallbackEndpoint: NextPage = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setModalShow(true);

    const params = new URLSearchParams(document.location.search);
    const paramsCodeValue = params.get("code")
    const paramsStateValue = params.get("state")
    const antiCsrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('antiCsrfToken'))
      .split('=')[1];

    document.cookie = `antiCsrfToken=${antiCsrfToken};max-age=0`;

    if (paramsStateValue === antiCsrfToken) {
      if (paramsCodeValue) {
        getTokenAndSignIn(paramsCodeValue);
      } else {
        errorRedirect("Invalid response", "API server does not responded with authorization code.");
      }
    }
    else {
      errorRedirect("Invalid Anti-CSRF Token", "The value of anti-CSRF token is different between the client and API server.");
    }

    async function getAccessToken(codeParam: string): Promise<string> {
      const baseURL = window.location.origin;
      const response = await fetch(`${baseURL}/api/github/getAccessToken`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeParam }),
      })
      const data = await response.json();
      const accessToken = data.access_token as string;

      return accessToken;
    }

    async function getTokenAndSignIn(codeParam: string) {
      const accessToken = await getAccessToken(codeParam);
      const credential = GithubAuthProvider.credential(
        accessToken
      );

      signInWithCredential(auth, credential)
        .then(() => {
          router.push("./dashboard");
        })
        .catch((error: FirebaseError) => {
          errorRedirect(error.code, error.message);
        })
    }

    function errorRedirect(title: string, message: string) {
      const redirectionUIProps: RedirectionUIProps = { title: title, message: message, pageToRedirect: "/login", isAutoRedirect: true }
      document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
      router.push("/redirection");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Signing in..</h1>
      {modalShow && <LoadingModal
        modalShow={modalShow}
      />}
    </>
  );
}

export default CallbackEndpoint;