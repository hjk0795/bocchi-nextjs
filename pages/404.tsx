import Redirection from "../components/redirection"

export default function Custom404() {
    return (
        <>
            <Redirection
                title="Internal Error - 404"
                message="Page Not Found"
                isAutoRedirect={true}
            />
        </>
    );
}