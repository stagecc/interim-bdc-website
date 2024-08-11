import React, { Fragment } from "react";
import styled from "styled-components";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { Seo } from "../seo";
import { Title } from "../typography";
import { PageNavMenu } from "./page-nav-menu";

export const Container = styled.div`
  // & * { border: 1px solid #f99; }
  width: ${props => props.width || "100%"};
  max-width: ${props => props.maxWidth || "100%"};
  ${props => (props.minWidth ? `max-width: ${props.minWidth};` : undefined)}
  ${props => (props.center ? "margin: auto;" : undefined)}
`;

const TOP_GUTTER = "3rem";
const BOTTOM_GUTTER = "3rem";

export const PageContainer = styled(Container)`
  margin-top: ${props => (props.gutters ? TOP_GUTTER : 0)};
  margin-bottom: ${props => (props.gutters ? BOTTOM_GUTTER : 0)};
`;

export const PageContent = ({title, hideTitle, menuItems, children, ...props}) => {
  return (
    <PageContainer {...props}>
      { title && <Seo title={title} description="" keywords="" /> }
      
      { menuItems ? (
        <Grid fluid>
          <Row>
            <Visible lg xl xxl>
              <Col lg={3}>
                <PageNavMenu menuItems={menuItems}/>
              </Col>
            </Visible>
            <Col xs={12} lg={9} style={{marginBottom: '8rem'}}>
              { (title && !hideTitle) && <Title>{title}</Title> }
              {children}
            </Col>
          </Row>
        </Grid>
      ) : (
        <Fragment>
          { (title && !hideTitle) && <Title>{title}</Title> }

          {children}
        </Fragment>
      )
      }
      
    </PageContainer>
  )
}