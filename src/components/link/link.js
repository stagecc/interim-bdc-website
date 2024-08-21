import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLink } from './external-link'

const hashPattern = new RegExp(/^#(.+)$/);
const externalUrlPattern = new RegExp(/^https?:\/\//);

export const Link = ({ to, children, ...props }) => {
  const isExternalLink = externalUrlPattern.exec(to)
  if (isExternalLink) {
    return <ExternalLink to={ to } { ...props }>{ children }</ExternalLink>
  }

  const hashLink = hashPattern.exec(to);
  if (hashLink) {
    return <a href={ to } { ...props }>{ children }</a>;
  }

  return <GatsbyLink to={ to } { ...props }>{ children }</GatsbyLink>;
}
