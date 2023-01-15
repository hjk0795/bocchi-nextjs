import RedirectionUI from "../components/redirectionUI"
import { NextPage } from "next/types";

const Custom500: NextPage = () => {
    return (
        <>
            <RedirectionUI
                title="Internal Error - 500"
                message="Server-side error occurred"
                isAutoRedirect={true}
            />
        </>
    );
}

export default Custom500;