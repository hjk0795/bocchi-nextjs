import styles from "../styles/loginButtonOAuth.module.css";
import _ from "lodash";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

type Props = {
    provider: string;
    icon: ReactElement<any, IconType>;
    signInWithProvider: () => void;
}

export default function LoginButtonOAuth({ provider, icon, signInWithProvider }: Props) {
    return (
        <>
            <div>
                <button
                    className={`btn btn-outline-dark ${styles.loginButton}`}
                    onClick={signInWithProvider}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        {icon}
                        <span className={styles[_.lowerCase(provider)]}>{`Sign in with ${provider}`}</span>
                    </div>
                </button>
            </div>
        </>
    );
}
