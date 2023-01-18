import RedirectionUI, { RedirectionUIProps } from "../components/redirectionUI";
import { useState, useEffect } from "react";
import { NextPage } from "next/types";

const Redirection: NextPage = () => {
  const [redirectionUIProps, setRedirectionUIProps] = useState<RedirectionUIProps>(null);

  useEffect(() => {
    const redirectionPropsValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('redirectionProps'))
      ?.split('=')[1];

    if (redirectionPropsValue) {
      document.cookie = 'redirectionProps=' + redirectionPropsValue + ";max-age=0";
      setRedirectionUIProps(JSON.parse(redirectionPropsValue));
    } else {
      setRedirectionUIProps({ title: "Invalid Access", pageToRedirect: "/", isAutoRedirect: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirectionUIProps !== null) {
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

export default Redirection;