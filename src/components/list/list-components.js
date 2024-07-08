import styled from "styled-components";

export const OrderedList = styled.ol`
  line-height: ${(props) => (props.dense ? "1.0" : "1.5")};
  padding: 1rem;
  ${props => props.noPadding && "padding-top: 0; padding-bottom: 0;"};
`;

export const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0 0 2rem 0;
  padding: 0;
  text-align: left;
  ${(props) => (props.center === true ? "text-align: center;" : undefined)}
  ${(props) => (props.right === true ? "text-align: right;" : undefined)}
  line-height: ${(props) => (props.dense ? "0.75" : "1.25")};
`;