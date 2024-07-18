import React from "react";
import { graphql } from "gatsby";
import { Title, Paragraph } from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
import { PastEventsList } from "../../components/events/past-event-list-grid"
import Avatar from '@mui/material/Avatar';
import BDCLogo from '../../images/favicon.png'

const PastEventsTemplate = ({data, pageContext}) => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>

      <Title>Event Archive</Title>

      <Module>
        <Paragraph>
          The following are past events supported by the BDC ecosystem. Items denoted with a <Avatar 
            src={BDCLogo} 
            alt='BDC logo' 
            component="span" 
            sx={{
              width: 20, height: 20,
              border: '1px solid #c5cfe8',
              display: 'inline-block',
              margin: '0 0.2rem'
            }}/> {" "}indicate events hosted by BDC.
        </Paragraph>
      </Module>
      <PastEventsList events={data.events.edges} />


      <Paragraph center>
        <ButtonLink primary={true} to="/news-and-events/events">
          View our upcoming events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};

export default PastEventsTemplate

export const allEventsQuery = graphql`
  query{
    events: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        internal: {contentFilePath: {regex: "/data/events/"}}
      }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            display_date
            path
            title
            url
            time
            location
            forum_post
            externalEvent
          }
        }
      }
    }
  }
`;
