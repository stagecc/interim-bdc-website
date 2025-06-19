import React from "react";
import styled from "styled-components";
import { Card } from "../../components/card";

export const FloatingContentCard = styled(Card)(({
  type,
  noPadding,
}) => `
  background-color: ${ type === "text" && "rgba(237, 240, 244, 0.8)" };
  padding: ${ noPadding ? 0 : '0 1.5rem' };
  @media screen and (max-width: 768px) {
    width: 100%;
    float: none;
  };
`);

const Wrapper = styled.div(({ placement, noPadding }) => `
  width: 45%;
  float: ${placement};
  padding: ${noPadding ? 0 : "0 1.5rem"};
  margin-top: 1rem;
  margin-left: ${placement === "right" ? "1.5rem" : 0};
  margin-right: ${placement === "left" ? "1.5rem" : 0};
  max-width: ${placement ? `calc(100% - 3rem)` : "100%"};
  @media screen and (max-width: 768px) {
    width: 100%;
    float: none;
    padding: 0.5rem 1.5rem;
  }
`);
export const FloatingTextWrapper = ({ placement, noPadding, children }) => (
  <Wrapper placement={placement} noPadding={noPadding}>
    <FloatingContentCard>{children}</FloatingContentCard>
  </Wrapper>
);

export const FloatingVideoWrapper = ({ placement, children }) => (
  <Wrapper placement={placement} noPadding>
    {React.Children.map(children, (item) => (
      <FloatingContentCard noPadding>
        {item}
      </FloatingContentCard>
    ))}
  </Wrapper>
);
