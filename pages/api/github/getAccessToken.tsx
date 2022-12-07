import { NextApiRequest, NextApiResponse } from "next";
import { handleHttpError } from "../../../utils/handleHttpError";

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.json(handleHttpError("Use \"GET\" for the request method"));
    }

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

        if (response.ok) {
            return res.json(await response.json());
        } else {
            return res.json(handleHttpError(response.status));
        }
    } catch (error) {
        if (error instanceof TypeError) {
            return res.json(handleHttpError(error.message));
        } else {
            return res.json(handleHttpError("Unexpected error thrown from fetch API"));
        }
    }
}