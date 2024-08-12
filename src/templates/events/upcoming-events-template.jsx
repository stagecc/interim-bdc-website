import React from "react";
import { graphql } from "gatsby";
import {
  Title,
  Paragraph,
} from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import {  PageContent } from "../../components/layout";
import { EventsList } from '../../components/events'
import { Avatar } from '@mui/material/';
import BDCLogo from '../../images/favicon.png'


const UpcomingEventsList = ({ data }) => {
  console.log(data)
  const upcomingEvents = data.events.nodes.filter(event => {
    const todaysDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    return event.frontmatter.date >= todaysDate;
  })

  return (
    <PageContent width="95%" maxWidth="800px">

      <Title>Upcoming Events</Title>

        <Paragraph>
          The following is a list of upcoming events supported by the BDC ecosystem. Items denoted with a <Avatar 
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

        <EventsList events={upcomingEvents} />

      <Paragraph center>
        <ButtonLink primary={true} to="/news-and-events/events/archive">
          View our past events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};

export default UpcomingEventsList

export const allEventsQuery = graphql`
  query {
    events: allMdx(
      sort: {frontmatter: {date: ASC}}
      filter: {
        internal: {contentFilePath: {regex: "/data/events/"}}
      }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          display_date
          path
          title
          url
          tags
          time
          location
          externalEvent
        }
        excerpt(pruneLength: 280)
      }
    }
  }
`;
