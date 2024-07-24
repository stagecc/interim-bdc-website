import React, { Fragment } from "react";
import { Heading, Paragraph, Title } from "../typography";
import { Link } from "../link";

export const Publication = ({node}) => {
const { id, title, date, location, url} = node
  return (
    <Fragment key={id}>
      <Heading>
        <Link to={url}>{title}</Link>
      </Heading>
      <div
        style={{
          borderLeft: "3px solid var(--color-lightgrey)",
          paddingLeft: "1rem",
        }}
      >
        <Paragraph>
          Published on {date} in <em>{location}</em>
        </Paragraph>
      </div>
      <br />
    </Fragment>
  )
}