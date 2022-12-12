import RedirectionUI, { RedirectionUIProps } from "../components/redirectionUI";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirection() {
  const [redirectionUIProps, setRedirectionUIProps] = useState<RedirectionUIProps>(null);
  const router = useRouter();

  useEffect(() => {
    const redirectionPropsValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('redirectionProps'))
      ?.split('=')[1];

    if (redirectionPropsValue) {
      document.cookie = 'redirectionProps=' + redirectionPropsValue + ";max-age=0";
      setRedirectionUIProps(JSON.parse(redirectionPropsValue));
    } else {
      setRedirectionUIProps({ title: "redirectionProps Not Exist" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirectionUIProps === null) {
    return (
      <>
        <h1>Redirecting...</h1>
      </>
    );
  } else {
    return (
      <>
        <RedirectionUI
          title={redirectionUIProps.title}
          message={redirectionUIProps.message}
          pageToRedirect={redirectionUIProps.pageToRedirect}
          isAutoRedirect={redirectionUIProps.isAutoRedirect}
        />
      </>
    );
  }
}

