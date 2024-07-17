import React from "react";
import {
  Title,
  Paragraph,
} from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import {  PageContent } from "../../components/layout";
import { Avatar } from '@mui/material/';
import BDCLogo from '../../images/favicon.png'


export default ({  }) => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>

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


      <Paragraph center>
        <ButtonLink primary={true} to="/about/events/archive">
          View our past events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};
