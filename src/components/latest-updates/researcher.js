import React, { Fragment } from "react";
import styled from "styled-components";
import { Heading, Subheading, } from "../typography";
import { Markdown } from "../markdown"
import { useWindowWidth } from "../../hooks";
import { getImage } from "gatsby-plugin-image"
import { HeadshotPhoto } from "./"

const ResearcherWrapper = styled.div(({ compact, partial }) => (`
  max-width: ${compact ? '100%' : '350px'};
  float: left;
  gap: 2rem;
  margin-bottom: 1.5rem;
  margin-right: ${compact ? '0' : '2rem'};
  background-color: #EFEFEF;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
`));

const ResearcherInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
`

const ResearcherDetails = styled.div`
  flex: 1;
  padding: 0 1rem;
  text-align: left;
  font-size: 85%;
  line-height: 1.7;
  width: 100%;
`;

export const ResearcherCard = ({ researchers, partial }) => {
  const { isCompact } = useWindowWidth()

  if (!researchers || researchers.length === 0) {
    return null
  }

  return (
    <ResearcherWrapper compact={isCompact} partial={partial}>
      {
        researchers.map((researcher) => {
          const image = getImage(researcher.image)

          return (
            <ResearcherInnerWrapper key={researcher.name || researcher.id}>
              <HeadshotPhoto image={image} />

              <ResearcherDetails>
                {researcher.name && (
                  <Fragment>
                    <Heading noMargin> About {researcher.name}</Heading>
                    { researcher.titleAffiliation && (
                      <Subheading>{researcher.titleAffiliation}</Subheading>
                    ) }
                    <Markdown>{researcher.description}</Markdown>
                  </Fragment>
                )}
              </ResearcherDetails>
            </ResearcherInnerWrapper>
          )
        })
      }
    </ResearcherWrapper>
  )
} 