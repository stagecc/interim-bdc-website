import React from "react"
import { graphql } from "gatsby"
import { PageContent } from '../../components/layout'
import { ArticleNavigation, ResearcherCard } from '../../components/latest-updates';
import { Title }  from '../../components/typography'
import './module.css'

const LatestUpdatesPost = ({ data: { mdx }, pageContext, children }) => {
  const { frontmatter: { title, researcher }} = mdx
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Title>{title}</Title>

      {/* todo: consider moving this researcher card inside the mdx file */}

      {
        researcher && (
          <ResearcherCard researcher={researcher} partial/>
        )
      }
      {children}

      <hr/>
      <ArticleNavigation prev={prev} next={next} />

    </PageContent>
  )
}

export const newsItemQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        researcher {
          name
          description
          image {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
export default LatestUpdatesPost