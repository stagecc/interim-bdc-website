import React from "react";
import styled from "styled-components";
import { Link } from "../link";
import { Visible } from "react-grid-system";
import { Meta } from "../typography"

export const ArticleNavigation = ({ prev, next }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        {prev && (
          <Link to={prev.frontmatter.path}>
            PREVIOUS{" "}
            <Visible md lg xl>
              ARTICLE
            </Visible>
            <br />
            <Meta>{prev.frontmatter.title}</Meta>
          </Link>
        )}
      </div>
      <div style={{ flex: 1, textAlign: "right" }}>
        {next && (
          <Link to={next.frontmatter.path}>
            NEXT{" "}
            <Visible md lg xl>
              ARTICLE
            </Visible>
            <br />
            <Meta>{next.frontmatter.title}</Meta>
          </Link>
        )}
      </div>
    </div>
  )
}