export default async function getAccessToken(req, res) {
  const params = "?oauth_token=" + req.query.oauth_token + "&oauth_verifier=" + req.query.oauth_verifier;

  await fetch("https://api.twitter.com/oauth/access_token" + params, {
    method: "POST",
    // headers: {
    //   Accept: "application/json",
    // },
    // mode: "no-cors",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      res.json(data);
    });
}
