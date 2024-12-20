import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "../buttons";
import { CloseIcon } from "../icons";
import { Paragraph } from "../typography";

const Wrapper = styled.div(({ active }) => `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border: solid var(--color-crimson);
  background: linear-gradient(90deg, var(--color-peach), #f2b5a799);
  color: var(--color-crimson);
  border-width: 0 0 6px 0;
  padding: 0.5rem;
  a {
    font-weight: 800;
    text-decoration-color: var(--color-blueberry);
  }
`);

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = ({ children, openedIcon, closedIcon }) => {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <Wrapper active={ open }>
        <Content>
          <Paragraph noMargin>
            { children }
          </Paragraph>
        </Content>
        <IconButton onClick={ () => setOpen(!open) } className="toggler">
          <CloseIcon size={ 16 } fill="var(--color-crimson-dark)" />
        </IconButton>
      </Wrapper>
    );
  }

  return null;
};