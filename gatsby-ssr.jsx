import React from "react";
import { Layout } from "./src/components/layout";
import { DialogProvider } from "./src/contexts/dialog-context";
import { SearchProvider } from './src/components/dug';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./src/styles/normalize.css";
import "./src/styles/customize.css";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <SearchProvider>
        <DialogProvider>
          <Layout>{element}</Layout>
        </DialogProvider>
      </SearchProvider>
    </GoogleReCaptchaProvider>
  )
}

export function onRenderBody({ setPostBodyComponents }) {
  setPostBodyComponents([
    <script
      key="0"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
                window.fwSettings={
                    'widget_id': 60000000998
                };
                !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}() 
            `
      }}
    />,
    <script
      key="1"
      type="text/javascript"
      src="https://widget.freshworks.com/widgets/60000000998.js"
      async
      defer
    ></script>
  ]);
}
