import React from 'react'
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";

const Wrapper =  styled.div(({ compact }) => `
  display: flex;
  flex-direction: ${compact ? 'column' : 'row'};
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  gap: 1.5rem;
  margin: 0 1rem;
`);

export const ButtonContainer = ({children}) => {
  const { isCompact } = useWindowWidth();

  return (
    <Wrapper compact={isCompact}>
      {children}
    </Wrapper>
  )
}