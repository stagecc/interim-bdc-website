import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "../buttons";
import { CloseIcon } from "../icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  border: solid;
  border-width: 0 0 6px 0;
  padding: 0.5rem 1rem 0.5rem 2rem;
  gap: 1rem;
  p {
    margin-top: 0; 
    margin-bottom: 0;
    line-height: 1.5;
  };
  a {
    font-weight: 800;
    text-decoration-color: var(--color-blueberry);
  };
  ${({ variant }) => 
    variant === "alert" && `
      background: linear-gradient(90deg, var(--color-peach), #f2b5a799);
      border-color: var(--color-crimson);
      color: var(--color-crimson);
    `
  }
  ${({ variant }) => 
    variant === "info" && `
      background: linear-gradient(90deg, var(--color-blueberry-light), var(--color-sky));
      border-color: var(--color-blueberry);
      color: #000;
      a {
        color: var(--color-blueberry-dark);
      }
    `
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Banner = ({ children, variant, openedIcon, closedIcon }) => {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <Wrapper active={ open } variant={variant}>
        <Content>
          { children }
        </Content>
        <IconButton onClick={ () => setOpen(!open) } className="toggler">
          <CloseIcon size={ 16 } fill="var(--color-crimson-dark)" />
        </IconButton>
      </Wrapper>
    );
  }

  return null;
};