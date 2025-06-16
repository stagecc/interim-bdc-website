import React from 'react';
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";

const Wrapper = styled.div(({ compact, width }) => `
  display: flex;
  flex-direction: ${compact ? 'column' : 'row'};
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  gap: 1.5rem;
  margin: 0 1rem;
  & a {
    width: ${width};
  };
`);

export const ButtonContainer = ({ children }) => {
  const { isCompact } = useWindowWidth();
  const count = React.Children.count(children);
  const width = count > 1 ? `${100 / count}%` : 'auto';

  return (
    <Wrapper compact={isCompact} width={width}>
      {children}
    </Wrapper>
  );
};
