import { RedirectionUIProps } from "../components/redirectionUI";
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
                const redirectionUIProps: RedirectionUIProps = { title: error.code, message: error.message, pageToRedirect: "/login" }
                document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
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
