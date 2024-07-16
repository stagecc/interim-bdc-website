import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const TagsList = ({
  items,
  separator = ", ",
  noItemsIndicator = " ∅",
}) => {
  return (
    <Fragment>
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
  separator: PropTypes.string,
  noItemsIndicator: PropTypes.any,
};
