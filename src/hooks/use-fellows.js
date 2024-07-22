import { graphql, useStaticQuery } from "gatsby";
import { kebabCase } from "../utils";

export const fellowFragment = graphql`
  fragment FellowDetails on Mdx {
    id
    frontmatter {
      name
      university
      cohort
      project {
        title
        abstract
      }
      bio
      photo {
        childImageSharp {
          gatsbyImageData(
            height: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`;

export const useFellows =() => {
  const data = useStaticQuery(
    graphql`
      {
        allMdx(
          sort: { internal: {contentFilePath: ASC} }
          filter: {internal: {contentFilePath: {regex: "/data/fellows/"}}}) {
          edges {
            node {
              ...FellowDetails
            }
          }
        }
      }
    `

  )
  return { 
    allFellows: data.allMdx.edges,
    allFellowsData: 
      data.allMdx.edges.map(({ node }) => ({
        id: node.id,
        slug: kebabCase(node.frontmatter.name.replace(/, Ph\.?D\.?$/, "")),
        ...node.frontmatter
      })),
    allFellowNames:
      data.allMdx.edges.map(({ node }) => ({
        id: node.id,
        ...node.frontmatter
      })),
  }
}