import React from 'react';
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { Button } from './button';

const Wrapper = styled.div(({ compact }) => `
  display: flex;
  flex-direction: ${compact ? 'column' : 'row'};
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  gap: 1.5rem;
  margin: 0 auto;
  /* make each Button take equal width in row layout */
  ${Button} {
    flex: 1;
  }
  /* if there's only one Button, shrink container to fit it */
  &:has(${Button}:only-of-type){
    width: max-content;
  }
`);

export const ButtonContainer = ({ children }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Wrapper compact={isCompact}>
      {children}
    </Wrapper>
  );
};
