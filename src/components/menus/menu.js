import React, { Fragment, useState } from "react";
import { Match } from "@reach/router";
import styled from "styled-components";
import { Link } from "../link";
import { ChevronDownIcon } from "../icons";
import { ButtonLink } from "../buttons"

export const MenuLink = styled(Link)`
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: #444;
  text-decoration: none;
  padding: 1rem 1rem;
  margin: 0;
  background-color: transparent;
  position: relative;
  height: 100%;
  &:hover,
  &:focus {
    background-color: #eee;
  }
  &.active {
    color: #fff;
    background-color: var(--color-crimson);
  }
`;

export const MenuItem = styled.span`
  background-color: inherit;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SubmenuHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin: 0;
  color: #333;
  background: ${(props) =>
    props.active
      ? "linear-gradient(to top, var(--color-crimson) 4px, #f9f6f3 4px, #f9f6f3 100%)"
      : props.open
        ? "linear-gradient(to top, #aaa 4px, #eee 4px, #eee 100%)"
        : 'white'
    };
  letter-spacing: 0;
  position: relative;
  font-size: 90%;
  font-weight: 400;
  cursor: pointer;
  height: 100%;
  white-space: nowrap;
  & svg {
    transition: transform 100ms;
    transform: ${(props) =>
      props.open ? "translateY(2px)" : "translateY(0)"};
    fill: ${(props) => (props.active ? "#222" : "#666")};
  }
  &:hover svg {
    transition: transform 250ms;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  background-color: transparent;
  ${SubmenuHeader}[class~="open"]:hover {
    background: linear-gradient(to top, #aaa 4px, #eee 4px, #eee 100%);
  }
`;

const Submenu = styled.nav.attrs({ className: "submenu" })`
  color: #eee;
  position: absolute;
  top: 100%;
  left: 50%;
  font-size: 80%;
  min-width: 100%;
  border: 0;
  background-color: #fff;
  overflow: hidden;
  z-index: -1;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  transition: transform 150ms, opacity 250ms;
  transform-origin: 50% 0%;
  transform: ${(props) =>
      props.open ? "scaleY(1) translateY(0)" : "scaleY(0) translateY(-2rem)"}
    translateX(-50%);
  opacity: ${(props) => (props.open ? 1.0 : 0.1)};
`;

const JoinBDCButton = styled(ButtonLink)`
  margin: 0 1rem;
  padding: 1rem;
  background-color: var(--color-blueberry);
  font-weight: bold;
`

export const Menu = ({ items, showBrand }) => {
  const [openSubmenu, setOpenSubmenu] = useState(-1);

  const handleOpenSubmenu = (index) => (event) => setOpenSubmenu(index);
  const handleCloseAllSubmenus = () => setOpenSubmenu(-1);

  return (
    <MenuContainer>
      {items.map((item, currentIndex) => {
        return (
          <MenuItem
            key={item.path}
            onMouseOver={item.submenu && handleOpenSubmenu(currentIndex)}
            onMouseOut={item.submenu && handleCloseAllSubmenus}
            onFocus={item.submenu && handleOpenSubmenu(currentIndex)}
            onBlur={item.submenu && handleCloseAllSubmenus}
          >
            {item.submenu ? (
              <Fragment>
                <Match path={item.path}>
                  {(props) => {
                    // "active" means we're looking at a page whose route contains the submenu's root route
                    const thisSubmenuIsActive = props.location.pathname.includes(
                      item.path
                    );
                    // Reach Router can style _links_ that are partially active out of the box.
                    // However, here, we want to style the submenu header (not a Link component)
                    // according to whether there is a partial location match.
                    // This substring check is how the value of the "active" prop is determined below.
                    // console.log(props.location.pathname, 'contains', item.path, ':', props.location.pathname.includes(item.path))
                    return (
                      <SubmenuHeader
                        active={thisSubmenuIsActive}
                        open={openSubmenu === currentIndex}
                        aria-label={`${item.text} submenu`}
                      >
                        {item.text} &nbsp;
                        <ChevronDownIcon size={16} />
                      </SubmenuHeader>
                    );
                  }}
                </Match>
                <Submenu
                  open={openSubmenu === currentIndex}
                  onClick={handleCloseAllSubmenus}
                >
                  {item.submenu.map((subitem) => (
                    <MenuLink
                      key={subitem.path}
                      to={subitem.path}
                      activeClassName="active"
                      partiallyActive={true}
                    >
                      {subitem.text}
                    </MenuLink>
                  ))}
                </Submenu>
              </Fragment>
            ) : (
              <MenuLink
                to={item.path}
                activeClassName="active"
                partiallyActive={false}
              >
                {item.text}
              </MenuLink>
            )}
          </MenuItem>
        );
      })}
      <MenuItem>
        <JoinBDCButton to="/join-bdc">Join BDC</JoinBDCButton>
      </MenuItem>
    </MenuContainer>
  );
};
