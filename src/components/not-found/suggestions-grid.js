import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  SuggestionCard,
  SuggestionCardPropTypes,
} from './suggestion-card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const SuggestionsGrid = ({ suggestions = [] }) => {
  return (
    <Grid>{
      suggestions.map(suggestion => (
        <SuggestionCard
          key={ suggestion.title }
          { ...suggestion }
        />
      ))
    }</Grid>
  );
};

SuggestionsGrid.propTypes = {
  suggestions: PropTypes.arrayOf(
    SuggestionCardPropTypes
  ).isRequired,
};
