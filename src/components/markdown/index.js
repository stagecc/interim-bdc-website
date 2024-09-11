import React from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  Heading,
  Paragraph,
  Subheading,
  Title,
} from "../typography";
import { List, ListItem } from "../list";
import { Link } from "../link";
import { Table } from "../table";

export const componentMap = () => ({
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
  ul: List,
  li: function listItem({ node, children, ...props }) {
    return <ListItem {...props} primary={children} />;
  },
  img: function image({ node, ...props }) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img {...props} width="100%" />
    )
  },
  table: Table,
});

export const Markdown = ({ children }) => {
  return (
    <MDXProvider components={ componentMap }>
      { children }
    </MDXProvider>
  );
};
