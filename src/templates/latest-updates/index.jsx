import React from "react"
import { graphql } from "gatsby"
import { PageContent } from '../../components/layout'
import { ArticleNavigation } from '../../components/latest-updates';
import { Title }  from '../../components/typography'
import './module.css'

const LatestUpdatesPost = ({ data: { mdx }, pageContext, children }) => {
  const { frontmatter: { title }} = mdx
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Title>{title}</Title>

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
      }
    }
  }
`
export default LatestUpdatesPost