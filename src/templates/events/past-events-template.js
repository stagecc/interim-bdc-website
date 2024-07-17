import React from "react";
import { Title, Paragraph } from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
import Avatar from '@mui/material/Avatar';
import BDCLogo from '../../images/favicon.png'

export default () => {

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

      <Paragraph center>
        <ButtonLink primary={true} to="/about/events">
          View our upcoming events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};

