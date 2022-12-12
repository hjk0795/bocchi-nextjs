import { RedirectionUIProps } from "../components/redirectionUI";
import { FirebaseError } from "firebase/app";

export const setCookieRedirection = (errorOrTitle: FirebaseError | string, pageToRedirect: string) => {
    let redirectionUIProps: RedirectionUIProps;

    if (errorOrTitle instanceof FirebaseError) {
        const error = errorOrTitle;
        redirectionUIProps = {
            title: error.code || error.name,
            message: error.message,
            pageToRedirect: pageToRedirect,
        };
    } else {
        const title = errorOrTitle;
        redirectionUIProps = {
            title: title,
            pageToRedirect: pageToRedirect,
        };
    }

    document.cookie = 'redirectionProps=' + JSON.stringify(redirectionUIProps);
};
