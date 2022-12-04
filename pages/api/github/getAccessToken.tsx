import { NextApiRequest, NextApiResponse } from "next";

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
    const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
    const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET;

    const params =
        "?client_id=" +
        githubClientID +
        "&client_secret=" +
        githubClientSecret +
        "&code=" +
        req.query.code;

    try {
        const response = await fetch("https://github.com/login/oauth/access_token" + params, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })

        if (!response.ok) {
            throw new Error('Network response was not OK');
          }
        
        const responseBody = await response.json();
        const accessToken = responseBody.access_token;

        return res.json({ "accessToken": accessToken });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}