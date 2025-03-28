import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'
import { graphql} from "gatsby";
import { PastEventAlert, EventNavigation } from "../../components/events"
import { Link } from "../../components/link";
import { Meta, Subheading } from "../../components/typography";
import { TagsList } from "../../components/tags"
import { Module, PageContent } from "../../components/layout";
import { HorizontalRule } from "../../components/horizontal-rule";
import { ButtonCta, ButtonContainer } from "../../components/buttons";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Grid, Stack, Box } from '@mui/material'
import { ReactMarkdown } from '../../components/markdown'

const EventMeta = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1rem;
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word; 
`

const EventMetadataWrapper = styled.div`
  ${Meta} {
    margin: 0;
  }
`;

const EventInfoLine = ({title, children}) => {
  return (
    <Fragment>
      <p style={{
        margin: '0.1rem 0',
        fontSize: '1.1rem',
        lineHeight: '1.5',
        fontWeight: '300',
        '& strong': {
          fontWeight: '600'
        }
      }}>
        {title && <strong>{title}: </strong>}
        {children}
      </p>
    </Fragment>
  )
}

EventInfoLine.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const EventInfo = ({date, display_date, time, tags, url, registration_required, location, past }) => {
return (
  <Fragment>
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      gap={{ xs: 1, sm: 2, md: 4 }}
      flex
      sx={{width: '100%', marginBottom: '1rem'}}
    >
      <Stack direction="column" sx={{flex: 1}} gap={1}>
        <Subheading noMargin left>Date and Time</Subheading>
        <Grid container spacing={2}>
          <Grid item>
            <CalendarTodayIcon sx={{fontSize:"1.2rem", margin: 0, color:"#21568a"}}/> 
          </Grid>
          <Grid item>
            <EventMeta>{display_date}</EventMeta>
            <EventMeta>{time}</EventMeta>
          </Grid>
        </Grid>
      </Stack>
      {
        location && (
          <Stack direction="column" sx={{ flex: 1 }} gap={1}>
          <Subheading noMargin left>
            Location
          </Subheading>
          <Grid container spacing={2} sx={{ alignItems: 'start' }}>
            <Grid item>
              <LocationOnOutlinedIcon sx={{fontSize:"1.2rem", margin: 0, color:"#21568a"}}/> 
            </Grid>
            <Grid item xs>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                  (!past && url) ? (
                    <EventMeta>
                      {location}: <Link to={url}>Register Here</Link>
                    </EventMeta>
                  ) : (
                    <Box sx={{
                      "& p": {
                        marginBottom: "0rem",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        marginTop: "0",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",  
                      }
                    }}>
                      <ReactMarkdown>{location}</ReactMarkdown>
                    </Box>
                  )
                }
              </Box>
            </Grid>
          </Grid>
        </Stack>  
        )
      }
    </Stack>

    { tags && <TagsList tags={tags}/>}

  </Fragment>
)
}

const SingleEventTemplate = ({ data, pageContext, children }) => {
  const {
    title,
    date,
    display_date,
    time,
    tags,
    zoom,
    url,
    forum_post,
    registration_required,
    location
  } = data.mdx.frontmatter
  const { prev, next } = pageContext;

  const todaysDate = new Date();

  const dateString = `${todaysDate.getFullYear()}-${
    todaysDate.getMonth() + 1 < 10 ? "0" : ""
  }${todaysDate.getMonth() + 1}-${
    todaysDate.getDate() < 10 ? "0" : ""
  }${todaysDate.getDate()}`;

  const parsedEventDate = new Date(Date.parse(date))

  const eventDate = `${parsedEventDate.getFullYear()}-${
    parsedEventDate.getMonth() + 1 < 10 ? "0" : ""
  }${parsedEventDate.getMonth() + 1}-${
    parsedEventDate.getDate() < 10 ? "0" : ""
  }${parsedEventDate.getDate()}`

  const past = dateString > eventDate

  return (
    <PageContent maxWidth="1000px" title={title}>

      {
        past && <PastEventAlert forum_post={forum_post}/>
      }

      <EventMetadataWrapper>
        <EventInfo
          date={date}
          display_date={display_date}
          time={time}
          url={zoom ? zoom.url : url}
          tags={tags}
          registration_required={registration_required}
          past={past}
          location={location}
        />
      </EventMetadataWrapper>

      {( registration_required && !past && url) && (
        <ButtonContainer>
          <ButtonCta href={url} target="_blank">
            Register Now!
          </ButtonCta>
        </ButtonContainer>
      )}

      <Module title="Event Details">
        {children}
      </Module>

      <HorizontalRule />

      <EventNavigation prev={prev} next={next} />

    </PageContent>
  );
};

export const singleEventQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        display_date
        title
        time
        url
        forum_post
        tags
        registration_required
        location
      }
    }
  }
`;


export default SingleEventTemplate