export default async function getAccessToken(req, res) {
  const twitterClientID = process.env.NEXT_PUBLIC_TWITTER_ID;
  const codeVerifier = process.env.NEXT_PUBLIC_CODE_VERIFIER;
  const base64 = process.env.NEXT_PUBLIC_TWITTER_BASE64;

  const params =
    "?code=" +
    req.query.code +
    "&grant_type=authorization_code" +
    "&client_id=" +
    twitterClientID +
    "&redirect_uri=http://localhost:3000/2b2fdd8dce12993016a59607a51fe516979370efdc124e2e45300a0a43ca2e05" +
    "&code_verifier=" +
    codeVerifier;

  await fetch("https://api.twitter.com/2/oauth2/token" + params, {
    method: "POST",
    headers: {
      // "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + base64,
    },
    // mode: "no-cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
}
