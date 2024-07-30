import PropTypes from "prop-types";
import styled from "styled-components";

export const Card = styled.div`
  overflow: hidden;
  ${props =>
    props.metaAlert ? `box-shadow: 4px 4px 12px rgba(186, 194, 204, 0.5);` : `box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);`}
  margin-bottom: 3rem;
  height: ${props => (props.metaAlert ? null : "100%")};
  display: flex;
  flex-direction: column;
  ${props =>
    props.metaAlert ? `background-color: rgba(237, 240, 244, 0.8)` : `background-color: #fff`}
`;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevate: PropTypes.bool.isRequired
};

Card.defaultProps = {
  elevate: true
};
