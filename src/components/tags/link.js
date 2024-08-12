import styled from "styled-components";
import { Link } from "../link";

export const TagLink = styled(Link)
.attrs(({ tag }) => ({
  to: `/tagged/${ tag }`,
  children: tag,
}))`
  background-color: var(--color-sky);
  border: 1px solid var(--color-blueberry-light);
  color: #222;
  padding: 1px 4px;
  margin: 2px;
  display: inline-block;
  align-self: center;
  text-decoration: none;
  filter: brightness(1.0);
  transition: filter 250ms;
  &:hover {
    text-decoration: none;
    filter: brightness(1.05);
  }
`;

