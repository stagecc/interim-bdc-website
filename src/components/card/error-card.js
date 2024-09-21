import { keyframes, styled } from 'styled-components';
import { Card } from '../card';

const drop = keyframes`
  0% {
    filter: opacity(0);
    transform: translateY(-4rem);
  }
  100% {
    filter: opacity(1);
    transform: translateY(0);
  }
`;

export const ErrorCard = styled(Card)`
  animation: ${drop} 250ms ease-out 1;
  background-color: #e6e9ec;
  padding: 2rem 4rem;
  border-radius: 8px;
  width: 100%;
  max-width: 750px;
  margin: 2rem auto;
  color: var(--color-crimson-dark);
  border: 1px solid var(--color-crimson);
`;
