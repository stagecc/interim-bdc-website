import React, { Fragment } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { PageContent } from '../../components/layout'
import { Subtitle, Heading, Paragraph } from "../../components/typography";
import { HorizontalRule } from "../../components/horizontal-rule";
import { PublishDateByLine, ArticleNavigation, ResearcherCard, ContributorCard } from '../../components/latest-updates';
import { TagsList } from "../../components/tags"
import './module.css'

const ArticleBody = styled.main`
  p,
  li,
  a {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`

const LatestUpdatesPost = ({ data: { mdx }, pageContext, children }) => {
  const { 
    frontmatter: { 
      title, subtitle, date, tags, 
      researchers,
      contributor
    }, 
    fields: { timeToRead }} = mdx
  const { prev, next } = pageContext;

  return (
    <PageContent maxWidth="1000px" title={title}>
      {
        subtitle && (
          <Subtitle className="article-subtitle">
            {subtitle}
          </Subtitle>
        )
      }

      <PublishDateByLine date={date} timeToRead={Math.ceil(timeToRead.minutes)}/>
      
      { tags && <TagsList tags={tags}/>}

      {/* todo: consider moving this researcher card inside the mdx file */}

      {
        researchers && (
          <ResearcherCard researchers={researchers} partial/>
        )
      }
      <ArticleBody>
        {children}
      </ArticleBody>

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
        tags
        researchers {
          name
          titleAffiliation
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
