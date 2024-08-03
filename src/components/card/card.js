import PropTypes from "prop-types";
import styled from "styled-components";

export const Card = styled.div(({
  elevate = true,
}) => (`
  overflow: hidden;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.25));
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #fffd;
`));

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevate: PropTypes.bool,
};
