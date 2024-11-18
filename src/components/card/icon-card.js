import React from "react";
import { Subheading } from "../typography";
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
        <Subheading left style={{marginTop: '1rem'}}>{title}</Subheading>
        {children}
      </div>
    </CardBody>
  </Card>
)}
