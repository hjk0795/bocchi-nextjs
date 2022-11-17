import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CallbackEndpointTwitter() {
  const router = useRouter();

//   useEffect(() => {
//     const requestState = process.env.NEXT_PUBLIC_GITHUB_REQUEST_STATE;
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const codeParam = urlParams.get("code");
//     const stateParam = urlParams.get("state");

//     if (stateParam === requestState) {
//       if (codeParam) {
//         async function getAccessToken() {
//           await fetch(
//             "http://localhost:3000/api/twitter/getAccessToken?code=" +
//               codeParam,
//             {
//               method: "GET",
//             }
//           )
//             .then((response) => {
//               return response.json();
//             })
//             .then((data) => {
//               document.cookie = `isAuthenticated=true`;
//               console.log(data);
//             })
//             .then(router.push("/redirect"));
//         }

//         getAccessToken();
//       }
//     }
//   }, []);

  return (
    <>
      <h1>Logging in...</h1>
    </>
  );
}
