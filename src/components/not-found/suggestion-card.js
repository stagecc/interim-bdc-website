import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
} from '../card';
import { Link } from '../link';

export const SuggestionCard = ({ title = "", links = [] }) => {
  return (
    <Card style={{ margin: 0 }}>
      <CardHeader>{ title }</CardHeader>
      <CardBody>
        <ul>{
          links.map(link => (
            <li key={ link.path }>
              <Link to={ link.path }>{ link.label }</Link>
            </li>
          ))
        }</ul>
      </CardBody>
    </Card>
  );
};

export const SuggestionCardPropTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

SuggestionCard.propTypes = SuggestionCardPropTypes;
