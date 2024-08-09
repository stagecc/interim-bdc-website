import styled from "styled-components";
import PropTypes from "prop-types";
import { Card } from "../../components/card";

export const FloatingContentWrapper = styled(Card)(({
  placement,
  type = "text",
  noPadding = false,
}) => `
  width: 45%;
  float: ${ placement };
  background-color: ${ type === "text" && "rgba(237, 240, 244, 0.8)" };
  padding: ${ noPadding ? 0 : '0 1.5rem' };
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: ${ placement === "right" ? "1.5rem" : 0 };
  margin-right: ${ placement === "left" ? "1.5rem" : 0 };
  max-width: ${ placement ? `calc(100% - 3rem)` : '100%' };
  @media screen and (max-width: 768px) {
    width: 100%;
    float: none;
    padding: 0.5rem 1.5rem;
  }
`);

FloatingContentWrapper.propTypes = {
  noPadding: PropTypes.bool,
  placement: PropTypes.oneOf(["left", "right"]),
  type: PropTypes.string,
};
