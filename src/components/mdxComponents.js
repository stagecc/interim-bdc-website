import React, { useMemo } from 'react'
import { MDXProvider } from "@mdx-js/react"

export const Markdown = ({ children }) => {
  const componentMap = useMemo(() => ({
    p: function Anchor({ node, href, children, ...props }) {
      return (
        <p style={{ lineHeight: '1.5', letterSpacing: '0.2px' }} {...props}>
          {children}
        </p>
      );
    },
    
    li: function Anchor({ node, href, children, ...props }) {
      return (
        <li style={{ lineHeight: '1.5', letterSpacing: '0.2px' }}>
          {children}
        </li>
      );
    },  }), [])

  return (
    <MDXProvider components={ componentMap } children={ children } />
  )
}