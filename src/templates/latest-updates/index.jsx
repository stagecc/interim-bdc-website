import React, { Fragment } from "react"
import { graphql } from "gatsby"
import { PageContent } from '../../components/layout'
import { Title, Subtitle, Heading, Paragraph } from "../../components/typography";
import { HorizontalRule } from "../../components/horizontal-rule";
import { PublishDateByLine, ArticleNavigation, ResearcherCard, ContributorCard } from '../../components/latest-updates';
import { LinkedTagsList } from "../../components/list"
import './module.css'

const LatestUpdatesPost = ({ data: { mdx }, pageContext, children }) => {
  const { 
    frontmatter: { 
      title, subtitle, date, author, tags, 
      researcher,
      contributor
    }, 
    fields: { timeToRead }} = mdx
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1000px">
      <Title>{title}</Title>

      {
        subtitle && (
          <Subtitle className="article-subtitle">
            {subtitle}
          </Subtitle>
        )
      }

      <PublishDateByLine date={date} author={author} timeToRead={Math.ceil(timeToRead.minutes)}/>
      
      { tags && <LinkedTagsList tags={tags}/>}

      {/* todo: consider moving this researcher card inside the mdx file */}

      {
        researcher && (
          <ResearcherCard researcher={researcher} partial/>
        )
      }
      {children}

      { contributor && (
        <Fragment>
          <HorizontalRule></HorizontalRule>

          <Heading>About This Article</Heading>
          <Paragraph>
            This article was written with information provided by the following participants.
          </Paragraph>

          {contributor.map((contributor, id) => (
            <div key={`contributor-${id}`}>
              <ContributorCard contributor={contributor}/>
            </div>
          ))}

        </Fragment>
      )}

      <HorizontalRule />

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
        subtitle
        author
        tags
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
        contributor {
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