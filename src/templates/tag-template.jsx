import React from "react";
import { graphql } from "gatsby";
import { Title, Heading, Paragraph } from "../components/typography";
import { PageContent } from "../components/layout";
import { ArticlePreview } from "../components/latest-updates";
import { EventsList } from "../components/events";

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;

  const articles = data.news.nodes;
  const events = data.events.nodes;

  return (
    <PageContent maxWidth="1000px">

      <div className="items-by-tag-container">
        <Title>Tagged: "{tag}"</Title>

        <section>
          <Heading>Articles</Heading>
          {articles.length ? (
            articles.map((article) => {
              const { path } = article.frontmatter;
              return (
                <ArticlePreview key={path} {...article} />
              );
            })
          ) : (
            <Paragraph>No articles were found with this tag.</Paragraph>
          )}
        </section>

        <br />
        <br />

        <section>
          <Heading>Events</Heading>
          {events.length ? (
            <EventsList events={events} />
          ) : (
            <Paragraph>No events were found with this tag.</Paragraph>
          )}
        </section>
      </div>
    </PageContent>
  );
};

export const taggedArtifactsQuery = graphql`
  query($tag: String!) {
    news: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        internal: {contentFilePath: {regex: "/data/latest-updates/"}}
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          path
          title
          tags
        }
        internal {
          contentFilePath
        }
        fields {
          timeToRead {
            text
            minutes
            time
            words
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
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          display_date
          title
          path
          time
          url
          forum_post
          tags
          registration_required
          externalEvent
          location
        }
        excerpt(pruneLength: 280)
      }
    }
  }
`;

export default TagTemplate