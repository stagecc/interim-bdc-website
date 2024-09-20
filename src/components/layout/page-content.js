import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { Container } from "./container";
import { Seo } from "../seo";
import { Title } from "../typography";
import { PageNavMenu, PageNavMenuPropTypes } from "./page-nav-menu";

const TOP_GUTTER = "3rem";
const BOTTOM_GUTTER = "3rem";

export const PageContentContainer = styled(Container)`
  margin-top: ${props => (props.$gutters ? TOP_GUTTER : 0)};
  margin-bottom: ${props => (props.$gutters ? BOTTOM_GUTTER : 0)};
`;

export const PageContent = ({
  title,
  description = "",
  keywords = "",
  hideTitle = false,
  menuItems = undefined,
  children,
  ...props
}) => {
  return (
    <PageContentContainer width="95%" maxWidth="1200px" center $gutters {...props}>
      { title && <Seo
        title={title}
        description={description}
        keywords={keywords}
      /> }
      {
        menuItems ? (
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
    </PageContentContainer>
  )
}


PageContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  hideTitle: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PageNavMenuPropTypes),
  children: PropTypes.node,
};
