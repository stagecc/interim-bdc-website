import React from "react";
import { Card, CardBody } from "../card";
import { Subheading, Paragraph } from "../typography";
import { Grid } from '@mui/material/';
import styled from "styled-components";
import { Link } from "../link"

export const Badge = styled.span`
  background-color: #fff;
  color: #666;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* height: 4rem; */
  width: 4rem;
  margin: 0;
  /* border: 1px solid red; */
`;
export const SupportCard = ({ resource }) => {
  const { title, icon, description, link } = resource
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} sx={{
      '& a': {
        textDecoration: "none",
        color: '#444'
      }
    }}>
      <Link noIcon to={link}>
        <Card style={{ margin: 0, height: "100%" }}>
          <CardBody style={{
            padding: "0.75rem 0.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: '1rem'
          }}>
              <Badge>{icon}</Badge>
              <div>
                <Subheading noMargin left style={{color: "var(--color-crimson)"}}>
                  {title}
                </Subheading> 
                <Paragraph noMargin left>{description}</Paragraph>
              </div>
          </CardBody>
        </Card>
      </Link>
    </Grid>
  );
};