import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  SuggestionCard,
  SuggestionCardPropTypes,
} from './suggestion-card';
import { notFoundSuggestions } from '../../pages/404.mdx';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

export const SuggestionsGrid = () => {
  return (
    <Grid>{
      notFoundSuggestions.map(suggestion => (
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
