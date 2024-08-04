import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const ListItemContainer = styled.li`
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0;
`;

const PrimaryText = styled.span`
  display: block;
`;

const SecondaryText = styled.span`
  display: block;
  font-size: 90%;
`;


export const ListItem = ({ primary, secondary, ...props }) => {
  return (
    <ListItemContainer {...props}>
      <PrimaryText>{primary}</PrimaryText>
      {secondary && <SecondaryText>{secondary}</SecondaryText>}
    </ListItemContainer>
  );
};

ListItem.propTypes = {
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node,
};

