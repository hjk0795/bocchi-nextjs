import { setCookieRedirection } from "../utils/setCookieRedirection";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { getRedirectResult } from "firebase/auth";

export default function SignInRedirectResult() {
    const router = useRouter();

    useEffect(() => {
        getRedirectResult(auth)
            .then(() => { router.push("/dashboard"); })
            .catch((error) => {
                setCookieRedirection(error, "/login");
                router.push("/redirection");
            })
            .finally(() => { document.cookie = "signInWithRedirect=true" + ";max-age=0"; });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Getting the sign-in result from Google...</h1>
        </>
    );
}
