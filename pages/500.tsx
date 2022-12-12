import RedirectionUI from "../components/redirectionUI"

export default function Custom500() {
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