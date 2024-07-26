import React from "react";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { List, ListItem } from "../../components/list"
import { navigate } from "gatsby";

export const MenuListItem = ({ href, heading }) => (
  <ListItem
    primary={
      <a href={`#${href}`} onClick={() => navigate(`#${href}`)}>
        {heading}
      </a>
    }
  />
)

export const StickyLeftMenu = ({ menuItems }) => (
  <Visible lg xl xxl>
    <Col lg={3}>
      <List
        style={{
          position: "sticky",
          top: "16rem",
          paddingRight: "2rem",
        }}
        right
      >
        {menuItems.map(({ heading, href }) => (
          <MenuListItem heading={heading} href={href}/>
        ))}
      </List>
    </Col>
  </Visible>
)

export const StickyLeftMenuContainer = ({ menuItems, children }) => (
  <Grid fluid>
    <Row>
      <StickyLeftMenu menuItems={menuItems}/>
      <Col xs={12} lg={9} style={{marginBottom: '8rem'}}>
        {children}
      </Col>
    </Row>
  </Grid>
)