import React from "react";
import { Heading, Meta } from "../../components/typography";
import { Card, CardBody } from "../../components/card";

export const InfoCard = ({children, title, icon}) => {
  const Icon = icon;

  return (
  <Card style={{
    margin: '2rem auto',
    maxWidth: 'calc(100% - 4rem)',
  }}>
    <CardBody style={{ display: 'flex', flexDirection: 'row'}}>
      <div style={{ margin: '2rem 2rem 2rem 1rem'}}>
        <Icon size={72} fill="#01366a"/>
      </div>
      <div>
        <Heading>{title}</Heading>
        <Meta style={{padding: 0}}>
          {children}
        </Meta>
      </div>
    </CardBody>
  </Card>
)}
