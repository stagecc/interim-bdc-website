import React from "react";
import { Layout } from "./src/components/layout";
import { DialogProvider } from "./src/contexts/dialog-context";
import { SearchProvider } from './src/components/dug';
import { FenceProvider } from "./src/hooks";

import "./src/styles/normalize.css";
import "./src/styles/customize.css";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <FenceProvider>
      <SearchProvider>
        <DialogProvider>
          <Layout>{element}</Layout>
        </DialogProvider>
      </SearchProvider>
    </FenceProvider>
  )
}

export const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps,
  getSavedScrollPosition,
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
