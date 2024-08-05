import styled from "styled-components";
import { animated } from "react-spring";
import { Subheading } from "../typography";

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
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
  overflow-y: auto;
  max-height: calc(100vh - 2rem);
`;

export const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

export const FellowsHeader = styled.div`
  display: flex;
  justify-content: end;
`

export const Title = styled(Subheading)`
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const Body = styled.div`
  padding: 1rem 2rem;
  text-align: left;
`;

export const Actions = styled.div`
  padding: 1rem;
  text-align: right;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  & button {
    padding: 0.5rem 1rem;
  }
`;