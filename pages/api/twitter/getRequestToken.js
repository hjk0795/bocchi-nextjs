import { authorizeRequest } from "../../../utils/authorizeRequest";

export default async function getRequestToken(req, res) {
  const headerParams = authorizeRequest();

  try {
    await fetch(
      `https://api.twitter.com/oauth/request_token?oauth_callback=http%3A%2F%2Flocalhost%3A3000%2F2b2fdd8dce12993016a59607a51fe516979370efdc124e2e45300a0a43ca2e05`,
      {
        method: "POST",
        headers: {
          Authorization: headerParams,
          Host: "api.twitter.com",
        },
        // mode: "cors",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    if (error.message === "Unexpected end of input") {
      console.log("No response from the server");
    }
  }

  
}
