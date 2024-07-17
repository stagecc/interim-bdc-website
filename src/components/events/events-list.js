import React from "react";
import { Paragraph } from "../typography";
import { Module } from "../layout";
import { EventListPreview } from './upcoming-event-list-preview'


export const EventsList = ({ title, events }) => {
  // const { isCompact } = useWindowWidth();
  console.log(events)
  return (
    <Module title={title}>
      <br />
      {events.length ? (
        events.map((event) => (<EventListPreview event={event} key={event.node.frontmatter.title}/>)
        )
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back soon!
        </Paragraph>
      )}
    </Module>
  );
};