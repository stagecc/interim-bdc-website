import React from "react"
import Menu from './menu'
import { Footer } from './footer'
import { MDXProvider } from "@mdx-js/react"

export default function Layout({ children }) {
  return (
    <MDXProvider components={{ }}>
      <div style={{
        margin: `0 auto`,
        maxWidth: 1000,
        border: '10px dashed crimson',
        padding: `0 1rem`,
      }}>
        <Menu />
        <hr />
        {children}
        <Footer />
      </div>
    </MDXProvider>
  )
};
