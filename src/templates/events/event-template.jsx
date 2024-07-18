import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'
import { graphql} from "gatsby";
import { PastEventAlert, EventNavigation } from "../../components/events"
import { Link } from "../../components/link";
import { Title, Meta, Subheading } from "../../components/typography";
import { LinkedTagsList } from "../../components/list"
import { Module, PageContent } from "../../components/layout";
import { HorizontalRule } from "../../components/horizontal-rule";
import { ButtonCta } from "../../components/buttons";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Grid, Stack, Box } from '@mui/material'

const EventMeta = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1;
  margin-top: 0;
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
            <EventMeta> {display_date}</EventMeta>
            <EventMeta>{time}</EventMeta>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="column" sx={{flex: 1}} gap={1}>
        <Subheading noMargin left>Location</Subheading>
        <Grid container spacing={2}>
          <Grid item>
            <LocationOnOutlinedIcon sx={{fontSize:"1.2rem", margin: 0, color:"#21568a"}}/> 
          </Grid>
          <Grid item>
            <Box>
              {
                (!past && url) ? (
                  <EventMeta>
                    {location}: <Link to={url}>Register Here</Link>
                  </EventMeta>
                ) : (
                  <EventMeta>
                    {location}
                  </EventMeta>
                )
              }
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Stack>

    <EventInfoLine title="Tags">
      { tags && <LinkedTagsList tags={tags}/>}
    </EventInfoLine>

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
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Title>{title}</Title>

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
        <div style={{ textAlign: "center", paddingTop: '2rem'}}>
          <ButtonCta href={url} target="_blank">
            Register Now!
          </ButtonCta>
        </div>
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