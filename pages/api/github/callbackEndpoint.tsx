import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { setCookie } from 'cookies-next';

export default async function CallbackEndpoint(req, res) {
  const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
  const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET;
  const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
  const codeParam = req.query.code as string
  const stateParam = req.query.state as string

  if (stateParam === requestState) {
    if (codeParam) {
      try {
        await handleCallback(codeParam);
        res.redirect("../../dashboard");
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
    }
  }
  else {
  }

  async function getAccessToken(codeParam: string): Promise<string> {

    const params =
      "?client_id=" +
      githubClientID +
      "&client_secret=" +
      githubClientSecret +
      "&code=" +
      codeParam;

    const response = await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
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
    setCookie('isAuthenticated', 'true', {req, res});
  }

  async function handleCallback(codeParam: string) {
    const accessToken = await getAccessToken(codeParam);
    await signIn(accessToken);
  }

}

