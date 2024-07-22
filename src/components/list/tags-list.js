import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Meta } from "../typography"
import { TagLink } from "../link"

export const TagsList = ({
  title,
  items,
  separator = ", ",
  noItemsIndicator = " ∅",
}) => {
  return (
    <Fragment>
      {title && <strong>{title}: </strong>}
      {items.length > 0
        ? items.map((item, i) => (
            <Fragment key={i}>
              {item}
              {i < items.length - 1 && separator}
            </Fragment>
          ))
        : noItemsIndicator}
    </Fragment>
  );
};

TagsList.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  separator: PropTypes.string,
  noItemsIndicator: PropTypes.any,
};

export const LinkedTagsList = ({ tags }) => (
  <Meta>
    <TagsList
      title="Tags"
      items={tags.map(tag => <TagLink key={`tag-${ tag }`} tag={tag} />)}
    />
  </Meta>
)