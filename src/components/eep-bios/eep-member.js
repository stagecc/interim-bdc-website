import React from "react";
import { getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from 'gatsby';
import styled from "styled-components";
import { EepHeadshot } from './';
import { useWindowWidth } from "../../hooks";

const FlexWrapper = styled.div(({ compact }) => `
  display: flex;
  flex-direction: ${compact ? 'column' : 'row'};
  h3 {
    margin-bottom: 0;
  };
`);

export const EepMember = ({imageName, children}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(    filter: {relativePath: {regex: "/eep-headshots/"}}
      ) {
        nodes {
          name
          relativePath
          childImageSharp {
            gatsbyImageData(width: 250, height: 250, layout: FIXED, placeholder: BLURRED)
          }
        }
      }
    }
  `);
  const { isCompact } = useWindowWidth();


  const imageNode = data.allFile.nodes.find(node => node.name === imageName);
  const image = getImage(imageNode);

  return (
    <FlexWrapper compact={isCompact}>
      <EepHeadshot image={image}/>
      <div>
        {children}
      </div>
    </FlexWrapper>
  )
}
