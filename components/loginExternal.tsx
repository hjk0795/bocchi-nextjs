import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import LoginButtonOAuth from "./loginButtonOAuth";
import styles from "../styles/loginExternal.module.css";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function LoginExternal() {
    const githubClientID = process.env.NEXT_PUBLIC_GITHUB_ID;
    const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
    const providerGoogle = new GoogleAuthProvider();
    const router = useRouter();

    async function signInWithGoogle() {
        try {
            await signInWithRedirect(auth, providerGoogle);
            document.cookie = `isAuthenticated=true`;
            router.push("/dashboard");
        } catch (error) {
            console.error(`${error.name}: ${error.message}`);
        }
    }

    function signInWithGithub() {
        window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=" +
            githubClientID +
            "&state=" +
            requestState
        );
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
