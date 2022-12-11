import Redirection from "../components/redirection"

export default function Custom500() {
    return (
        <>
            <Redirection
                title="Internal Error - 500"
                message="Server-side error occurred"
                isAutoRedirect={true}
            />
        </>
    );
}