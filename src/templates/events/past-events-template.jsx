import React from "react";
import { graphql } from "gatsby";
import { Paragraph } from "../../components/typography";
import { ButtonLink, ButtonContainer } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
import { PastEventsList } from "../../components/events/past-event-list-grid"
import Avatar from '@mui/material/Avatar';
import BDCLogo from '../../images/favicon.png'

const PastEventsTemplate = ({data}) => {
  
  const pastEvents = data.events.edges.filter(event => {
    const todaysDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    return event.node.frontmatter.date < todaysDate
  })

  return (
    <PageContent maxWidth="800px" title="Event Archive">

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
      <PastEventsList events={pastEvents} />


      <ButtonContainer>
        <ButtonLink primary={true} to="/news-and-events/events">
          View our upcoming events
        </ButtonLink>
      </ButtonContainer>
    </PageContent>
  );
};

export default PastEventsTemplate

export const allEventsQuery = graphql`
  query {
    events: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        internal: {contentFilePath: {regex: "/data/events/"}}
      }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "YYYY-MM-DD")
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
