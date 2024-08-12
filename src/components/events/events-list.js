import React from "react";
import { Paragraph } from "../typography";
import { Module } from "../layout";
import { EventListPreview } from './upcoming-event-list-preview'


export const EventsList = ({ events = [] }) => {
  return (
    <Module>
      {events.length ? (
        events.map((event) => <EventListPreview {...event} key={event.frontmatter.path}/>
        )
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back soon!
        </Paragraph>
      )}
    </Module>
  );
};
