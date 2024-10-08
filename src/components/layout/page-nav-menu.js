import React from "react";
import PropTypes from "prop-types";
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

export const MenuListItemPropTypes = PropTypes.shape({
  href: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
});

MenuListItem.propTypes = MenuListItemPropTypes;

const fadeIn = keyframes`
  0% { filter: opacity(0); }
  100% { filter: opacity(1); }
`;

const FadingListItem = styled(ListItem)`
  animation: ${fadeIn} 250ms linear ;
`;


export const PageNavMenu = ({ menuItems }) => {
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
        <MenuListItem
          key={ `nav-${href}` }
          heading={heading}
          href={href}
        />
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

export const PageNavMenuPropTypes = {
  menuItems: PropTypes.arrayOf(
    MenuListItemPropTypes
  ).isRequired,
};

PageNavMenu.propTypes = PageNavMenuPropTypes;
