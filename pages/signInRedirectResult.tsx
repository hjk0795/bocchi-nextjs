import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { getRedirectResult } from "firebase/auth";


export default function SignInRedirectResult() {
    const router = useRouter();

    useEffect(() => {
        getRedirectResult(auth)
            .then(() => {
                document.cookie = "signInWithRedirect=true" + ";max-age=0";
                router.push("/dashboard");
            }).catch((error) => {
                const propsForRedirection = {
                    title: error.code,
                    message: error.message,
                    pageToRedirect: "/login",
                }

                document.cookie = 'propsForRedirection=' + JSON.stringify(propsForRedirection);

                router.push("/error");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Getting the sign-in result from Google...</h1>
        </>
    );
}
