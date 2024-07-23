import React, { Fragment } from "react";
import styled from "styled-components";
import { Heading, Subheading, } from "../typography";
import { Markdown } from "../mdxComponents"
import { useWindowWidth } from "../../hooks";
import { getImage } from "gatsby-plugin-image"
import { HeadshotPhoto } from "./"

const ResearcherWrapper = styled.div(({ compact, partial }) => (`
  display: flex;
  flex-direction: column;
  max-width: ${compact ? '100%' : '350px'};
  float: left;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: ${compact ? '0' : '2rem'};
  background-color: #EFEFEF;
  padding: 0 1rem 1rem ;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
`));

const ResearcherDetails = styled.div`
  flex: 1;
  padding: 0 1rem;
  text-align: left;
  font-size: 85%;
  line-height: 1.7;
  width: 100%;
`;

export const ResearcherCard = ({researcher, partial}) => {
  const { isCompact } = useWindowWidth()
  const image = getImage(researcher.image)
  
  return (
    <ResearcherWrapper compact={isCompact} partial={partial}>
      <HeadshotPhoto image={image} />

        <ResearcherDetails >
          {researcher.name && (
            <Fragment>
              <Heading> About {researcher.name}</Heading>
              <Subheading>Researcher, University of Colorado</Subheading>
              <Markdown>{researcher.description}</Markdown>
            </Fragment>
          )}
        </ResearcherDetails>
    </ResearcherWrapper>
  )
}