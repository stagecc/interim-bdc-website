import React from 'react'
import { Link as GatsbyLink} from "gatsby"

export const Link = ({ to, children, ...props }) => {
  const externalUrlPattern = new RegExp(/^https?:\/\//)
  const match = externalUrlPattern.exec(to)
  if (match) {
    return <a to={ to } { ...props }>{ children }</a>
  }
  return <GatsbyLink to={ to } { ...props }>{ children }</GatsbyLink>
}