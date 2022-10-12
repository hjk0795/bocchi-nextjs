import { useSession, getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content: "welcome to the secret page",
    });
  } else {
    res.send({
      content: "Sign in required",
    });
  }
};
