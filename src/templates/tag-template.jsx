import React from "react";
import styled from "styled-components";
import { Link } from "../components/link";
import { graphql } from "gatsby";
import { Title, Heading, Subheading, Paragraph, Meta } from "../components/typography";
import { LinkedTagsList } from "../components/list";
import { PageContent } from "../components/layout";

const TagHeading = styled(Subheading)`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;

  const articles = data.news.edges.map(({ node }) => node);
  const events = data.events.edges.map(({ node }) => node);

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>

      <div className="items-by-tag-container">
        <Title>Tagged: "{tag}"</Title>

        <section>
          <Heading>Articles</Heading>
          {articles.length ? (
            articles.map((article) => {
              const { title, path, date, tags } = article.frontmatter;
              return (
                <article key={title}>
                  <TagHeading noMargin>
                    <Link to={path}>{title}</Link>
                  </TagHeading>
                  <Meta noMargin>
                    <strong>Publication Date:</strong> {date}
                    <br />
                    <LinkedTagsList noMargin tags={tags} />
                  </Meta>
                  <br/>
                </article>
              );
            })
          ) : (
            <Paragraph>No articles with this tag!</Paragraph>
          )}
        </section>

        <br />
        <br />

        <section>
          <Heading>Events</Heading>
          {events.length ? (
            events.map((event) => {
              const { title, path, date, tags } = event.frontmatter;
              return (
                <article key={title}>
                  <TagHeading noMargin>
                    <Link to={path}>{title}</Link>
                  </TagHeading>
                  <Meta noMargin>
                    <strong>Event Date:</strong> {date} <br />
                    <LinkedTagsList noMargin tags={tags} />
                    <br/>
                  </Meta>
                </article>
              );
            })
          ) : (
            <Paragraph>No events with this tag!</Paragraph>
          )}
        </section>
      </div>
    </PageContent>
  );
};

export const newsByTagQuery = graphql`
  query($tag: String!) {
    news: allMdx(
      filter: {
        internal: {contentFilePath: {regex: "/data/latest-updates/"}}
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  
    events: allMdx(
      filter: {
        internal: {contentFilePath: {regex: "/data/events/"}}
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;

export default TagTemplate