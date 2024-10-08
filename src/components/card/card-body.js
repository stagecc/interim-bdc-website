import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Hidden } from "react-grid-system";

const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const CardBodyGraphic = styled.div`
  background-image: url(${props => props.imagePath});
  background-position: 50% 0;
  background-size: cover;
  width: 25%;
  min-width: 100px;
  max-width: 300px;
`;

const CardBodyContents = styled.div.attrs({
  className: "card-body__contents"
})(({ fgColor = "inherit", bgColor = "#f9f6f3" }) => (`
  flex: 1;
  padding: 1rem 2rem 2rem;
  background-color: ${bgColor};
  color: ${fgColor};
`));

CardBodyContents.propTypes = {
  fgColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired
};

export const CardBody = ({ children, image, style }) => {
  return (
    <CardBodyWrapper style={style}>
      <Hidden xs>
        {image && image.path && image.placement === "left" ? (
          <CardBodyGraphic imagePath={image.path} />
        ) : (
          <br />
        )}
      </Hidden>
      <CardBodyContents style={style}>{children}</CardBodyContents>
      <Hidden xs>
        {image && image.path && image.placement === "right" && (
          <CardBodyGraphic imagePath={image.path} />
        ) }
      </Hidden>
    </CardBodyWrapper>
  );
};
