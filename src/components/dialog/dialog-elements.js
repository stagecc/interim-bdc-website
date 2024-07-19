import styled from "styled-components";
import { animated } from "react-spring";
import { Heading } from "../typography";

export const Wrapper = styled(animated.div).attrs({ role: "dialog" })`
  width: 95%;
  max-width: 800px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: #eee;
  color: var(--color-eggplant);
  padding: 0.5rem 1rem;
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
  overflow-y: auto;
  max-height: calc(100vh - 2rem);
`;

export const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export const FellowsHeader = styled.div`
  display: flex;
  justify-content: end;
`

export const Title = styled(Heading)`
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const Body = styled.div`
  padding: 0 1rem;
  text-align: left;
`;

export const Actions = styled.div`
  padding: 1rem;
  text-align: right;
  & button {
    margin: 0.25rem 0.5rem;
  }
`;