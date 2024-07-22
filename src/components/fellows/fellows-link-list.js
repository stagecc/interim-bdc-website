import styled from "styled-components";

export const FellowsLinkList = styled.div`
  -moz-columns: 250px 3;
  -webkit-columns: 250px 3;
  columns: 250px 4;
  margin: 2rem auto;
  padding: 0;
  line-height: 1.5;
  & > * {
    display: block;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const FellowsLinkListItem = styled.a`
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0.75rem;
`;
