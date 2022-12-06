import { NextApiRequest, NextApiResponse } from "next";

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
    const githubClientID = process.env.GITHUB_ID;
    const githubClientSecret = process.env.GITHUB_SECRET;
    const authGrantCode = req.query.code as string;

    const params =
        "?client_id=" +
        githubClientID +
        "&client_secret=" +
        githubClientSecret +
        "&code=" +
        authGrantCode;

    try {
        const response = await fetch("https://github.com/login/oauth/access_token" + params, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
        const responseBody = await response.json();
        const statusCode = response.status;

        if (response.ok) {
            // if (responseBody.hasOwnProperty("access_token")) {
            //     return res.status(200).json({ "accessToken": responseBody.access_token });
            // } else if (responseBody.hasOwnProperty("error")) {
            //     switch (responseBody.error) {
            //         case "incorrect_client_credentials":
            //             return res.status(200).json({ "error": "The client_id and/or client_secret passed are incorrect" });
            //         case "redirect_uri_mismatch":
            //             return res.status(200).json({ "error": "The redirect_uri MUST match the registered callback URL for this application" });
            //         case "bad_verification_code":
            //             return res.status(200).json({ "error": "The code passed is incorrect or expired" });
            //     }
            // }
            return res.status(200).json(responseBody);
        } else {
            switch (statusCode) {
                case 404:
                    return res.status(200).json({ "error": "Request query is not valid. Check typos in URI query parameters and fragments" });
                case 422:
                    return res.status(200).json({ "error": "Request base URI is not valid. Check typos in the base URI" });
                default:
                    return res.status(200).json({ "error": `Unexpected error occurred. Error code: ${statusCode}` });
            }
        }



    } catch (error) {
        return res.status(500).json({ "error": "Request from the backend server didn't reach Github API server because of a network error" });
    }
}