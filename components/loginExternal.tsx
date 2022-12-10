import styles from "../styles/loginExternal.module.css";
import LoginButtonOAuth from "./loginButtonOAuth";
import { generateRandomString } from "../utils/generateRandomString";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function LoginExternal() {
    function signInWithGoogle() {
        signInWithRedirect(auth, new GoogleAuthProvider());
        document.cookie = "signInWithRedirect=true";
    }

    function signInWithGithub() {
        const antiCsrfToken = generateRandomString(10);
        const baseURI = "https://github.com/login/oauth/authorize";
        const paramClientID = "?client_id=" + process.env.NEXT_PUBLIC_GITHUB_ID
        const paramState = "&state=" + antiCsrfToken;

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
        </div>
    </>
}
