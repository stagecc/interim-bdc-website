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

export const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps,
}) => {
  const previous = prevRouterProps?.location.pathname || -1;
  const next = routerProps.location.pathname;

  setTimeout(() => {
    if (previous !== next) {
      window.scrollTo(0, 0);
    }
  }, 0);

  return false;
};
