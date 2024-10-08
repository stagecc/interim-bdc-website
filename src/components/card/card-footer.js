import PropTypes from "prop-types";
import styled from "styled-components";

export const CardFooter = styled.div(({
  fgColor = "#fff",
  bgColor = "var(--color-crimson)",
}) => (`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.fgColor ? props.fgColor : "inherit")};
  background-color: ${props => (props.bgColor ? props.bgColor : "inherit")};
  padding: 2rem;
  height: 4rem;
`));

CardFooter.propTypes = {
  fgColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
