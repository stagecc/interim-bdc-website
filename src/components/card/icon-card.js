import React from "react";
import { Heading, Meta } from "../typography";
import { Card, CardBody } from ".";

export const IconCard = ({children, title, icon}) => {
  const Icon = icon;

  return (
  <Card>
    <CardBody style={{ display: 'flex', flexDirection: 'row'}}>
      {icon && (
        <div style={{ margin: '2rem 2rem 2rem 1rem'}}>
          <Icon size={52} fill="#01366a"/>
        </div>
      )}
      <div>
        <Heading>{title}</Heading>
        <Meta style={{padding: 0}}>
          {children}
        </Meta>
      </div>
    </CardBody>
  </Card>
)}
