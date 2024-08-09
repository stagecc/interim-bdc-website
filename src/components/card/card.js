import PropTypes from "prop-types";
import styled from "styled-components";

export const Card = styled.div(({
  elevate = true,
}) => (`
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.25);
  filter: 
    drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))
    drop-shadow(4px -4px 4px rgba(0, 0, 0, 0.1))
    drop-shadow(-4px 8px 4px rgba(0, 0, 0, 0.1));
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #fffd;
`));

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevate: PropTypes.bool,
};
