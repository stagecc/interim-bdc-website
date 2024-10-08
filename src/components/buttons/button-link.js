import React from 'react';
import styled from "styled-components";
import { Link } from "../link";
import { Button } from "./button";

const transitionBrightness = `
    transition: filter 250ms;
    filter: brightness(1.0);
    &:hover {
        filter: brightness(1.25);
    }
`;

const StyledButton = styled(Button)`
  ${transitionBrightness};
  text-align: center;
  max-width: 100%;
  text-wrap: wrap;
  line-height: 1.5;
`

export const ButtonLink = props => {
  return (
    <StyledButton as={ Link } lightIcon { ...props } />
  )
};

export const ButtonExternalLink = styled(ButtonLink)
  .attrs({ rel: 'noopener noreferrer', target: '_blank' })`
  ${transitionBrightness}
`;

export const ButtonCta = styled(ButtonLink)`
  font-weight: 600;
  padding: 1rem 2rem;
  font-size: 120%;
  letter-spacing: 2px;
  // transition function inherited from ButtonLink, ...but changing the filter effect to include shadow
  filter: drop-shadow(0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)) brightness(1);
  &:hover {
    filter: drop-shadow(0 0.25rem 0.5rem rgba(0, 0, 0, 0.4)) brightness(1.25);
  }
`;
