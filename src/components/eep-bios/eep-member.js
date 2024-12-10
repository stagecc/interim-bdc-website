import React from "react";
import { getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from 'gatsby';
import styled from "styled-components";
import { EepHeadshot } from './';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  h3 {
    margin-bottom: 0;
  }
`

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


  const imageNode = data.allFile.nodes.find(node => node.name === imageName);
  const image = getImage(imageNode);

  return (
    <FlexWrapper>
      <EepHeadshot image={image}/>
      <div>
        {children}
      </div>
    </FlexWrapper>
  )
}
