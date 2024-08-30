import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { ExternalLink } from './external-link';
import { getLinkType } from '../../utils';

export const Link = ({ to, children, ...props }) => {
  const linkType = getLinkType(to);

  if (linkType === "isNonGovExternalLink" || linkType === "isGovLink") {
    return <ExternalLink to={to} {...props}>{children}</ExternalLink>;
  }

  if (linkType === "hashLink") {
    return <a href={to} {...props}>{children}</a>;
  }

  return <GatsbyLink to={to} {...props}>{children}</GatsbyLink>;
};
