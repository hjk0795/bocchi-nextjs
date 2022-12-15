import { NextApiRequest, NextApiResponse } from "next";
import { handleHttpError } from "../../../utils/handleHttpError";

export default async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json(handleHttpError("Use \"POST\" for the request method"));
    }

    const clientInfo = {
        client_id: process.env.NEXT_PUBLIC_GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.body.code as string
    }
    Object.freeze(clientInfo);

    try {
        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientInfo),
        })

        if (response.ok) {
            return res.status(200).json(await response.json());
        } else {
            return res.status(200).json(handleHttpError(response.status));
        }
    } catch (error) {
        if (error instanceof TypeError) {
            if (error.message.includes("CORS")) {
                return res.status(502).json(handleHttpError(error.message));
            } else if (error.message.includes("Failed to fetch")) {
                return res.status(500).json(handleHttpError(error.message));
            }
        } else {
            return res.status(500).json(handleHttpError("Unexpected error thrown from fetch API"));
        }
    }
}