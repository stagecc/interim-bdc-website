import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Meta } from "../typography"
import { TagLink } from "./link";

export const TagsList = ({
  tags = [],
}) => {
  return (
    <Meta style={{ lineHeight: 1.75 }}>
      {tags.map((tag, i) => (
        <Fragment key={`tag-${tag}-${i}`}>
          <TagLink tag={tag} />
          {i < tags.length - 1 && <span>&nbsp;&nbsp;</span>}
        </Fragment>
        ))}
    </Meta>
  );
};

TagsList.propTypes = {
  separator: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};
