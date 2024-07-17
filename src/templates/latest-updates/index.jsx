import React from "react"
import { graphql } from "gatsby"
import { PageContent } from '../../components/layout'
import { PublishDateByLine, ArticleNavigation, ResearcherCard } from '../../components/latest-updates';
import { Title }  from '../../components/typography'
import './module.css'

const LatestUpdatesPost = ({ data: { mdx }, pageContext, children }) => {
  const { 
    frontmatter: { title, date, author, researcher },
    fields: { timeToRead }
  } = mdx
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Title>{title}</Title>

      <PublishDateByLine date={date} author={author} timeToRead={Math.ceil(timeToRead.minutes)}/>
      
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
      fields {
        timeToRead {
          text
          minutes
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        author
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