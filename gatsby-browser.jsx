import React from "react";
import { Layout } from "./src/components/layout";
import { DialogProvider } from "./src/contexts/dialog-context";
import "./src/styles/normalize.css";
import "./src/styles/customize.css";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <DialogProvider>
      <Layout>{element}</Layout>
    </DialogProvider>
)
}