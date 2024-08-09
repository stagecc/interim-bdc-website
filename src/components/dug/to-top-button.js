import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useScrollPosition }  from '../../hooks';
import { BackToTopButton } from '../buttons';

//

const VisibilityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  height: 42px;
  width: 100%;
  zIndex: 999;
  .back-to-top-button {
    transition: transform 250ms, filter 250ms;
  }
  &.visible .back-to-top-button {
    transform: translate3d(0, 0, 0) !important;
    filter: opacity(1.0) !important;
  }
  &.hidden .back-to-top-button {
    transform: translate3d(0, 100%, 0) !important;
    filter: opacity(0.0) !important;
  }
`;

export const ToTopButton = () => {
  const scrollPosition = useScrollPosition()

  const visible = useMemo(() => {
    return scrollPosition > 0.9 * window.innerHeight
  }, [scrollPosition]);

  return (
    <VisibilityWrapper
      className={ visible ? 'visible' : 'hidden' }
    >
      <BackToTopButton />
    </VisibilityWrapper>
  )
}
