import React, { useMemo } from 'react'
import { MDXProvider } from "@mdx-js/react"
import {
  Title,
  Heading,
  Paragraph
} from './typography'
import { Link } from "./link"

export const Markdown = ({ children }) => {
  const componentMap = useMemo(() => ({
    p: function Anchor({ node, children, ...props }) {
      return (
        <Paragraph {...props}>
          {children}
        </Paragraph>
      );
    },
    h1: function Anchor({ node, children, ...props }) {
      return (
        <Title {...props}>
          {children}
        </Title>
      );
    },
    h2: function Anchor({ node, children, ...props }) {
      return (
        <Heading {...props}>
          {children}
        </Heading>
      );
    },
    a: function Anchor({ node, href, children, ...props }) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }, 
    li: function Anchor({ node, children, ...props }) {
      return (
        <li style={{ lineHeight: '1.5', letterSpacing: '0.2px' }}>
          {children}
        </li>
      );
    },  
  }), [])

  return (
    <MDXProvider components={ componentMap } children={ children } />
  )
}