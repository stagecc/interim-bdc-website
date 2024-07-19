import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { Subheading, Subsubheading, Paragraph } from "../typography";
import { kebabCase } from "../../utils";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem 1rem;
`;

const FellowHeadingSection = styled.div`
  display: flex;
  flex-direction:  ${(props) => (props.compact ? "column" : "row" )};
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => (props.compact ? "1rem" : "0.5rem")};
`

const FellowName = styled(Subheading)`
  font-size: 1.1rem;
`;

const FellowSubtitle = styled(Subsubheading)`
  font-weight: normal;
  font-size: 1rem;
`;

const FellowPhoto = styled(GatsbyImage)`
  max-width: 150px;
  max-height: 150px;
  min-width: 150px;
  min-height: 150px;
  clip-path: circle(45%);
  margin-right: 1rem;
`;

const FellowsDetailsSection = styled.div`
margin-bottom: 0.5rem;
`
const FellowDetailsHeading = styled(Subsubheading)`
  margin-bottom: 0.75rem;
  line-height: 1.25;
`
const FellowsDetailsText = styled(Paragraph)`
  font-size: 90%;
  line-height: 1.3;
`

export const FellowsProfile = ({ fellow }) => {
  const { isCompact } = useWindowWidth();
  const { name, university, bio, project, photo} = fellow
  const image = getImage(photo)
  
  return (
    <Wrapper id={kebabCase(name.replace(/,.+$/, ""))}>
      <FellowHeadingSection compact={isCompact}>
        <FellowPhoto image={image} />
        <div>
          <FellowName center noMargin>{name}</FellowName>
          <FellowSubtitle center noMargin>{university}</FellowSubtitle>
          <FellowSubtitle center noMargin>Cohort I</FellowSubtitle>
        </div>
      </FellowHeadingSection>
      <FellowsDetailsSection>
        <FellowDetailsHeading noMargin>Biography</FellowDetailsHeading>
        <FellowsDetailsText>{bio}</FellowsDetailsText>
        <FellowDetailsHeading>Project</FellowDetailsHeading>
        <FellowsDetailsText>
          <strong>{project.title}: </strong>{project.abstract}
        </FellowsDetailsText>
      </FellowsDetailsSection>
    </Wrapper>
  );
};
