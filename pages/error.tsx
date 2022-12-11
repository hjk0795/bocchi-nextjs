// import Redirection from "../components/redirection";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

import Redirection from "../components/redirection";



export default function Error() {
  

    return (
        <Redirection
        title = "test"
        message= "hello everyone"
        />
    );

    // const [redirection, setRedirection] = useState({
    //     message: "",
    //     pageToRedirect: ""
    // });
    // const router = useRouter();

    // useEffect(() => {
    //     const redirection = {
    //         message: "",
    //         pageToRedirect: ""
    //     };
    //     const message = document.cookie
    //         .split('; ')
    //         .find((row) => row.startsWith('errorMessage'))
    //         ?.split('=')[1];

    //     const pageToRedirect = document.cookie
    //         .split('; ')
    //         .find((row) => row.startsWith('pageToRedirect'))
    //         ?.split('=')[1];

    //     document.cookie = "errorMessage=" + message + ";max-age=0";
    //     document.cookie = "pageToRedirect=" + pageToRedirect + ";max-age=0";

    //     if (message) {
    //         if (pageToRedirect) {
    //             redirection.message = message;
    //             redirection.pageToRedirect = pageToRedirect;

    //             setRedirection(redirection);
    //         }
    //     }
    // }, []);

    // if (redirection.message === "") {
    //     return (
    //         <>
    //             <h1>ERROR</h1>
    //         </>
    //     );
    // } else {
    //     return (
    //         <>
    //             <Redirection
    //                 message={redirection.message}
    //                 seconds={5}
    //                 pageToRedirect={redirection.pageToRedirect}
    //             />
    //         </>
    //     );
    // }
}

