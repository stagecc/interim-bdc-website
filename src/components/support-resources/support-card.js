import React from "react";
import styled from "styled-components";
import { Subheading, Paragraph } from "../typography";
import { Link } from "../link"

const CardBadge = styled.div`
  background-color: transparent;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #ddd;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: center;
  padding: 1rem;
`

const Card = styled(Link)
  .attrs(props => ({
    to: props.link,
    noIcon: true,
    style: {
    }
  }))`
    text-decoration: none;
    background-color: #f9f6f3;
    flex: 1 0 400px;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 175px;
    filter: 
      drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))
      drop-shadow(4px -4px 4px rgba(0, 0, 0, 0.1))
      drop-shadow(-4px 8px 4px rgba(0, 0, 0, 0.1));
    &:hover, &:focus {
      filter: 
        drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.15))
        drop-shadow(6px -6px 6px rgba(0, 0, 0, 0.2))
        drop-shadow(-6px 8px 6px rgba(0, 0, 0, 0.15))
        brightness(1.05);
    };
    transition: filter 250ms ease-in;
  `

export const SupportCard = ({ title, icon, description, link }) => {
  return (
    <Card link={ link }>
      <CardBadge>
        {React.createElement(icon, { size: 50, fill: 'var(--color-blueberry)' })}
      </CardBadge>
      <CardBody>
        <Subheading noMargin left style={{ color: "var(--color-crimson)" }}>
          {title}
        </Subheading> 
        <Paragraph noMargin left>{description}</Paragraph>
      </CardBody>
    </Card>
  )
}
