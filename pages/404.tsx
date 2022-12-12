import RedirectionUI from "../components/redirectionUI"

export default function Custom404() {
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