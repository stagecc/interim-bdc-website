import React, { useState } from "react";
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { getImage } from "gatsby-plugin-image"
import { HeadshotPhoto } from "./"
import { Paragraph } from "../typography"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Collapse,
  Stack,
} from '@mui/material'

const FlexWrapper = styled.div(({ compact, partial }) => (`
  display: flex;
  gap: 1rem;
  flex-direction: ${compact ? 'column' : partial ? 'column' : 'row'};
  max-width: ${partial ? '400px' : '100%'};
  float: ${partial ? 'left' : 'none'};
  justify-content: center;
  align-items: ${compact ? 'center' : partial ? 'center': 'flex-start'};
  margin-bottom: 2rem;
  background-color: #EFEFEF;
  padding: 1rem;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
  margin-right: ${partial ? '2rem' : 'inherit'};
  text-align: ${partial ? 'center' : 'inherit'};
`));

const ContributorDetails = styled.div`
flex: 1;
overflow-y: hidden;
position: relative;
padding-right: 2rem;
&::after {
  content: "";
  position: absolute;
  background-image: linear-gradient(#ffffff00, #efefef);
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  max-height: 2rem;
  pointer-events: none;
  display: ${props => (props.expand && "none")};
} ;
`;

const ExpandIcon = ({ expanded }) => <ExpandMoreIcon sx={{
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 250ms',
}} />;

export const ContributorCard = ({ contributor }) => {
  const { isCompact } = useWindowWidth()
  const [expanded, setExpanded] = useState()

  const image = getImage(contributor.image)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };

  return (
    <FlexWrapper compact={isCompact}>
      <HeadshotPhoto image={image} />

      <div>
        <ContributorDetails expand={expanded}>
          {contributor.name && (
            <h3>{contributor.name}</h3>
          )}
          {contributor.description && (
            <Collapse 
              in={expanded}  
              collapsedSize="150px"
              orientation="vertical"
            >
              <Paragraph>{contributor.description}</Paragraph>
            </Collapse>
          )}
        </ContributorDetails>
        <Stack alignItems="flex-end">
          <Button
            onClick={handleExpandClick}
            endIcon={<ExpandIcon expanded={expanded } />}
            aria-expanded={expanded }
            aria-label="read more"
            size="small"
            sx={{
              color: "var(--color-blueberry-dark)",
              fontFamily: "inherit",
            }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        </Stack>
      </div>
    </FlexWrapper>
  )
}
