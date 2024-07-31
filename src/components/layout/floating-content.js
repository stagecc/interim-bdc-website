import styled from "styled-components";

export const FloatingContentWrapper = styled.div(({placement, type})=>`
  width: 45%;
  float:  ${ placement==="left" ? "left" : "right" };
  background-color: ${ type==="text" && "rgba(237, 240, 244, 0.8)"};
  box-shadow: ${ type==="text" && "4px 4px 12px rgba(186, 194, 204, 0.5)"};
  padding: 0 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: ${ placement === "right" ? "1.5rem" : 0 };
  margin-right: ${ placement === "left" ? "1.5rem" : 0 };
  @media screen and (max-width: 768px) {
    width: 100%;
    float: none;
    padding: 0.5rem 1.5rem;
  }
`)