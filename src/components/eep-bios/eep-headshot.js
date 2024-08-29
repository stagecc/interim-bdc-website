import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image"


export const EepHeadshot = styled(GatsbyImage)`
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  clip-path: circle(45%);
  margin-right: 1rem;
  margin-top: 1.75rem;
`;