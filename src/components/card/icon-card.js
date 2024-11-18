import React from "react";
import { Heading, Meta } from "../typography";
import { Card, CardBody } from ".";
import styled from "styled-components";

const IconWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 767px) {
  };
`;

export const IconCard = ({children, title, icon}) => {
  const Icon = icon;

  return (
  <Card>
    <CardBody style={{ display: 'flex', flexDirection: 'row'}}>
      {icon && (
        <IconWrapper>
          <Icon  sx={{ fontSize: 80, color: '#01366a' }} />
        </IconWrapper>
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
