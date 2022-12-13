import styles from "../styles/loginExternal.module.css";
import LoginButtonOAuth from "./loginButtonOAuth";
import { SetStateAction, Dispatch } from "react";
import { generateRandomString } from "../utils/generateRandomString";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Props = {
    setModalShow: Dispatch<SetStateAction<boolean>>
};

export default function LoginExternal({ setModalShow }: Props) {

    function signInWithGoogle() {
        document.cookie = "signInWithRedirect=true";
        setModalShow(true);
        signInWithRedirect(auth, new GoogleAuthProvider());
    }

    function signInWithGithub() {
        const antiCsrfToken = generateRandomString(10);
        const baseURI = "https://github.com/login/oauth/authorize";
        const paramClientID = "?client_id=" + process.env.NEXT_PUBLIC_GITHUB_ID
        const paramState = "&state=" + antiCsrfToken;

        setModalShow(true);
        sessionStorage.setItem("antiCsrfToken", antiCsrfToken);
        window.location.assign(baseURI + paramClientID + paramState);
    }

    return <>
        <div className={styles.container}>
            <LoginButtonOAuth
                provider="Google"
                signInWithProvider={signInWithGoogle}
                icon={<BsGoogle size={25} />}
            />
            <LoginButtonOAuth
                provider="Github"
                signInWithProvider={signInWithGithub}
                icon={<BsGithub size={25} />}
            />

            <button
            onClick={()=>{setModalShow(true)}}
            >TEST</button>
        </div>
    </>
}
