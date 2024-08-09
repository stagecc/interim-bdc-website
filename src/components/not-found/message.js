import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Heading, Subheading } from '../typography';

export const NotFoundMessage = ({ primary = "", secondary = "" }) => {
  return (
    <Fragment>
      <Heading center style={{
        maxWidth: '500px',
        margin: '3rem auto',
        fontSize: '200%',
        color: 'var(--color-blueberry)',
        fontWeight: 'normal',
      }}>{ primary }</Heading>
      <Subheading center style={{
        maxWidth: '750px',
        margin: '3rem auto',
        fontSize: '150%',
        color: 'var(--color-blueberry)',
      }}>{ secondary }</Subheading>
    </Fragment>
  );
};

NotFoundMessage.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
};
