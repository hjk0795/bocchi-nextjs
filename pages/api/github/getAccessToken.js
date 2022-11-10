export default async function getAccessToken(req, res) {
  const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
  const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET;

  const params =
    "?client_id=" +
    githubClientID +
    "&client_secret=" +
    githubClientSecret +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    mode: "no-cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
}
