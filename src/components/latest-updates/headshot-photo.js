import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image"

const PhotoWrapper = styled.div`
  margin: 1rem;
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`;

const ResearcherPhoto = styled(GatsbyImage)`
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  clip-path: circle(100%);
  transition: filter 250ms;
  border: 6px solid #b33243;
  border-radius: 50%;
`;

export const HeadshotPhoto = ({image}) => (
  <PhotoWrapper>
    <ResearcherPhoto image={image}/>
  </PhotoWrapper>
)