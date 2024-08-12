import styled from "styled-components";

export const Container = styled.div`
  width: ${props => props.width || "100%"};
  max-width: ${props => props.maxWidth || "100%"};
  ${props => (props.minWidth ? `max-width: ${props.minWidth};` : undefined)}
  ${props => (props.center ? "margin: auto;" : undefined)}
`;

