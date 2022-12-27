import styles from "../styles/loginButtonOAuth.module.css";
import _ from "lodash";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

type LoginButtonOAuthProps = {
    provider: string;
    icon: ReactElement<any, IconType>;
    signInWithProvider: () => void;
}

const LoginButtonOAuth: React.FC<LoginButtonOAuthProps> = ({ provider, icon, signInWithProvider }) => {
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

export default LoginButtonOAuth;