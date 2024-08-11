import React from "react";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { keyframes, styled } from 'styled-components';
import { useScrollPosition } from "../../hooks";
import { List, ListItem } from "../../components/list";
import { BackToTopButton } from "../buttons";

const BACK_TO_TOP_SCROLL_THRESHOLD = 400;

export const MenuListItem = ({ href, heading }) => (
  <ListItem
    primary={
      <a href={`#${href}`}>
        {heading}
      </a>
    }
  />
);

const fadeIn = keyframes`
  0% { filter: opacity(0); }
  100% { filter: opacity(1); }
`;

const FadingListItem = styled(ListItem)`
  animation: ${fadeIn} 250ms linear ;
`;


export const StickyLeftMenu = ({ menuItems }) => {
  const scrollPosition = useScrollPosition();
  const showBackToTopButton = scrollPosition > BACK_TO_TOP_SCROLL_THRESHOLD;

  return (
    <List
      style={{
        position: "sticky",
        top: "16rem",
        paddingRight: "2rem",
      }}
      right
    >
      {menuItems.map(({ heading, href }) => (
        <MenuListItem heading={heading} href={href} />
      ))}
      { showBackToTopButton && (
        <FadingListItem
          primary={ <BackToTopButton /> }
          style={{
           marginTop: '3rem',
           display: 'flex',
           justifyContent: 'flex-end',
          }}
        />
      ) }
    </List>
  );
};

export const StickyLeftMenuContainer = ({ menuItems, children }) => (
  <Grid fluid>
    <Row>
      <Visible lg xl xxl>
        <Col lg={3}>
          <StickyLeftMenu menuItems={menuItems}/>
        </Col>
      </Visible>
      <Col xs={12} lg={9} style={{marginBottom: '8rem'}}>
        {children}
      </Col>
    </Row>
  </Grid>
);