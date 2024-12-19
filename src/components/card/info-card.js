import React from "react";
import { Card, CardBody } from "../../components/card";

export const InfoCard = ({children, fullWidth}) => (
  <Card style={{
    width: '100%',
    margin:  fullWidth ? "2rem 0": "2rem auto",
    maxWidth: fullWidth ? null : '85%',
  }}>
    <CardBody>
      {children}
    </CardBody>
  </Card>
)
