import React from "react";
import { Heading, Meta } from "../../components/typography";
import { Card, CardBody } from "../../components/card";

export const NextStepsCard = ({children}) => (
  <Card style={{
    margin: '2rem auto',
    maxWidth: 'calc(100% - 4rem)',
  }}>
    <CardBody>
      <Heading style={{ margin: '1rem 0' }}>Frequent Next Steps</Heading>
      <Meta style={{padding: 0}}>
        {children}
      </Meta>
    </CardBody>
  </Card>
)
