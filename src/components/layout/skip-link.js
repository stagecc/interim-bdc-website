import styled from "styled-components";

export const SkipLink = styled.a`
  display: block;
  position: absolute;
  background-color: var(--color-crimson);
  color: #eee;
  padding: 0.5rem;
  z-index: 999;
  transition: transform 250ms;
  transform: translateY(-100%);
  &:focus {
    transform: translateY(0%);
  }
`;
