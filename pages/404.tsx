import RedirectionUI from "../components/redirectionUI"
import { NextPage } from "next/types";

const Custom404: NextPage = () => {
    return (
        <>
            <RedirectionUI
                title="Internal Error - 404"
                message="Page Not Found"
                isAutoRedirect={true}
            />
        </>
    );
}

export default Custom404;