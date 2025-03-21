import React from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  Heading,
  Paragraph,
  Subheading,
  Title,
} from "../typography";
import { Link } from "../link";
import RawReactMarkdown from 'react-markdown'

export const componentMap = {
  p: function paragraph({ node, children, ...props }) {
    return (
      <Paragraph {...props}>
        {children}
      </Paragraph>
    );
  },
  h1: function h1({ node, children, ...props }) {
    return (
      <Title {...props}>
        {children}
      </Title>
    );
  },
  h2: function h2({ node, children, ...props }) {
    return (
      <Heading {...props}>
        {children}
      </Heading>
    );
  },
  h3: function h3({ node, children, ...props }) {
    return (
      <Subheading {...props} style={{ marginTop: '2rem' }}>
        {children}
      </Subheading>
    );
  },
  a: function anchor({ node, href, children, ...props }) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }, 
  li: function listItem({ node, children, ...props }) {
    return (
      <li style={{ lineHeight: '1.5', letterSpacing: '0.2px' }}>
        {children}
      </li>
    );
  },  
};

export const Markdown = ({ children }) => {
  return (
    <MDXProvider components={ componentMap }>
      { children }
    </MDXProvider>
  );
};

export const ReactMarkdown = ({ children }) => {
  return (
    <RawReactMarkdown 
      components={ componentMap }
      children={ children }
    />
  );
};