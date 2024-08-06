import React from "react";
import { Link } from "../link";
import styled from "styled-components";
import bdcLogo from "../../images/bdc-logo.svg";
import bdcLogoWhite from "../../images/bdc-logo-white.svg";

const BrandContainer = styled(Link).attrs({
  className: "brand"
})`
  height: 100%;
  margin: auto 0;
  padding: 0 1rem;
  transformOrigin: 0% 50%;
`;

export const Brand = ({
  path = "/",
  white = false,
  height = "auto",
  width = "auto",
  style,
  compact,
}) => {
  return (
    <BrandContainer to={path} style={{ ...style, maxWidth: width }} compact={ compact }>
      <img
        src={white ? bdcLogoWhite : bdcLogo}
        height="auto"
        width="100%"
        alt="BioData Catalyst logo"
      />
    </BrandContainer>
  );
};
