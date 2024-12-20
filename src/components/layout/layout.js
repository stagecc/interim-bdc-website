import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import {
  Header,
  Brand,
  Main,
  Footer,
  Subfooter,
  Container,
  StickyWrapper,
  LineBreak
} from "../layout";
import { Banner } from "../banner";
import { Paragraph } from "../typography";
import { Link } from "../link";
import { Menu, MobileMenu } from '../menus';
import { Markdown } from '../markdown';
import { menuItems } from "../../data/menu";
import { List, ListItem } from "../list";
import { useWindowWidth } from "../../hooks";
import hexBackgroundLeftSvg from "../../images/hex-background-left.svg";
import hexBackgroundRightSvg from "../../images/hex-background-right.svg";
import { SkipLink } from './skip-link';
import "../../styles/normalize.css";
import "../../styles/customize.css";

const LayoutWrapper = styled.div(
  ({ compact }) => `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    &::after {
      content: "";
      left: 0;
      top: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -2;
      ${ compact ? `
        background-image: url(${hexBackgroundLeftSvg});
        background-position: -4rem 0;
        background-size: 400px;
        background-repeat: repeat-y;
        background-attachment: fixed;
      ` : `
        background-image: url(${hexBackgroundLeftSvg}), url(${hexBackgroundRightSvg});
        background-position: -4rem 0, calc(100% + 4rem) 0;
        background-size: 400px;
        background-repeat: repeat-y, repeat-y;
        background-attachment: fixed;
      ` }
    }
  `
);

// styles/customize.css defines smooth scroll behavior site-wide.
// however, we want to snap to the top of page on a route change.
const RouteChangeScroller = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};
export function Layout({ children }) {
  const { isCompact } = useWindowWidth();

  return (
    typeof isCompact === "boolean" && (
      <LayoutWrapper compact={isCompact ? true : undefined}>
        <RouteChangeScroller />
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Banner variant="info">
          NHLBI BioData Catalyst® (BDC) supports data and analysis in a secure, FISMA-moderate environment. BDC security controls adhere to <Link to="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-24-157.html">NIH's Implementation Update for Data Management and Access Practices Under the Genomic Data Sharing Policy (NOT-OD-24-157)</Link>.
        </Banner>
        <Visible md>
          <Header style={{ backgroundColor: '#f9f6f3' }}>
            <Brand width="380px" />
          </Header>
        </Visible>
        <StickyWrapper stuck={true}>
          <Header>
            <Visible xs sm lg xl xxl>
              <Brand width="380px" />
            </Visible>
            <Visible md lg xl xxl>
              <span />
              <Menu items={menuItems} />
            </Visible>
            <Visible xs sm>
              <span />
              <MobileMenu items={menuItems} />
            </Visible>
          </Header>
        </StickyWrapper>

        <Main id="main-content">
          <Markdown>
            {children}
          </Markdown>          
        </Main>

        <Footer>
          <Container width="95%" maxWidth="1200px" center>
            <Grid fluid>
              <Row>
                <Col xs={12} md={5} push={{ md: 7 }}>
                  <List center={isCompact} right={!isCompact}>
                    <ListItem primary={<Link to="/user-resources/user-faqs/">FAQs</Link>} />
                    <ListItem
                      primary={<Link to="/accessibility">Accessibility</Link>}
                    />
                    <ListItem
                      primary={<Link to="/privacy">Privacy Policy</Link>}
                    />
                    <ListItem
                      primary={
                        <Link
                          lightIcon
                          to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/"
                        >
                          Documentation
                        </Link>
                      }
                    />
                    <ListItem
                      primary={
                        <Link
                          lightIcon
                          to="https://www.hhs.gov/vulnerability-disclosure-policy/index.html"
                        >
                          HHS Vulnerability Disclosure
                        </Link>
                      }
                    />
                    <ListItem
                      primary={
                        <Link to="https://www.nhlbi.nih.gov/about/foia-fee-for-service-office">
                          Freedom of Information Act (FOIA)
                        </Link>
                      }
                    />
                  </List>
                </Col>
                <Col xs={12} md={7} pull={{ md: 5 }}>
                  <Paragraph center={isCompact} left={!isCompact ? "true" : undefined}>
                    BDC is a product of the <Link to="https://www.nhlbi.nih.gov/">National
                    Heart, Lung, and Blood Institute</Link> of the <Link to="https://www.nih.gov/">
                    National Institutes of Health.</Link>
                    <LineBreak count={2} />
                    For general inquiries, <Link to="/help-and-support/contact-us/">contact us</Link>.
                    <LineBreak count={2} />
                    &copy; {new Date().getFullYear()}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={{ textAlign: "center" }}>
                  <strong style={{ textTransform: "uppercase" }}>
                    <Link
                      lightIcon
                      to="http://www.biodatacatalyst.org/Security/login"
                    >
                      Consortium Member Portal
                    </Link>
                  </strong>
                </Col>
              </Row>
            </Grid>
          </Container>
        </Footer>
        <Subfooter compact={isCompact ? true : undefined}>
          <Link to="https://www.hhs.gov/">
            U.S. Department of Health & Human Services
          </Link>
          <Visible md lg xl xxl>
            <strong>&bull;</strong>
          </Visible>
          <Link to="https://www.nih.gov/">
            National Institutes of Health
          </Link>
          <Visible md lg xl xxl>
            <strong>&bull;</strong>
          </Visible>
          <Link to="https://www.nhlbi.nih.gov/">
            National Heart, Lung, and Blood Institute
          </Link>
          <Visible md lg xl xxl>
            <strong>&bull;</strong>
          </Visible>
          <Link to="https://www.usa.gov/">USA.gov</Link>
        </Subfooter>
      </LayoutWrapper>
    ))
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
