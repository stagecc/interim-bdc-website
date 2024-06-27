import React from 'react'

export const ExternalLink = ({
  to,
  children,
  ...props
}) => {
  return (
    <a to={ to } { ...props }>{ children }</a>
  )
}