export const handleHttpError = (statusCodeOrMessage: number | string) => {
    const response = { error: '' };

    if (typeof statusCodeOrMessage === "number") {
        const statusCode = statusCodeOrMessage;
        response.error += `${statusCode} `;

        switch (statusCode) {
            case 400:
                response.error += "Bad Request";
                break;
            case 401:
                response.error += "Unauthorized";
                break;
            case 403:
                response.error += "Forbidden";
                break;
            case 404:
                response.error += "Not Found";
                break;
            case 500:
                response.error += "Internal Server Error";
                break;
            case 502:
                response.error += "Bad Gateway";
                break;
            case 504:
                response.error += "Gateway Timeout";
                break;
            default:
                if ((400 <= statusCode) && (statusCode <= 499)) {
                    response.error += "Client Error";
                } else if ((500 <= statusCode) && (statusCode <= 599)) {
                    response.error += "Server Error";
                } else {
                    response.error += "Informational response(1xx) or Redirection(3xx)";
                }
        }
    } else if (typeof statusCodeOrMessage === "string") {
        const errorMessage = statusCodeOrMessage;
        response.error += `${errorMessage}`;
    }

    return response;
};
