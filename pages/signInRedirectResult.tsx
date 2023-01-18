import LoadingModal from "../components/loadingModal";
import { RedirectionUIProps } from "../components/redirectionUI";
import { useState, useEffect } from "react";
import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { getRedirectResult } from "firebase/auth";

const SignInRedirectResult: NextPage = () => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setModalShow(true);
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
            <h1>Signing in..</h1>
            {modalShow && <LoadingModal
                modalShow={modalShow}
            />}
        </>
    );
}

export default SignInRedirectResult;