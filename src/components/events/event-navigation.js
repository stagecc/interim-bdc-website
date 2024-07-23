import React from "react";
import { Link } from "../link";
import { Visible } from "react-grid-system";
import { Meta } from "../typography"

export const EventNavigation = ({ prev, next }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        {prev && (
          <Link to={prev.frontmatter.path}>
            PREVIOUS{" "}
            <Visible md lg xl>
              EVENT
            </Visible>{" "}
            <br />
            <Meta>
              {prev.frontmatter.title}
              <br />
              <small>on {prev.frontmatter.date}</small>
            </Meta>
          </Link>
        )}
      </div>
      <div style={{ flex: 1, textAlign: "right" }}>
        {next && (
          <Link to={next.frontmatter.path}>
            NEXT{" "}
            <Visible md lg xl>
              EVENT
            </Visible>{" "}
            <br />
            <Meta>
              {next.frontmatter.title}
              <br />
              <small>on {next.frontmatter.date}</small>
            </Meta>
          </Link>
        )}
      </div>
    </div>
  )
}