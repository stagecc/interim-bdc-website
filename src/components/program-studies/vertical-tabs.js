import React from "react";
import styled from "styled-components";
import { kebabCase } from "../../utils/casing";
import { useRef, useState } from "react";

export const Tabs = ({
  data,
  selectedTab,
  setSelectedTab,
  ariaLabeledBy,
}) => {
  const tabRefs = useRef([]);

  const getDefaultFocusTab = () => {
    const index = data.findIndex(({ key }) => key === selectedTab);
    return index > 0 ? index : 0;
  };

  const [focusedTabIndex, setFocusedTabIndex] = useState(getDefaultFocusTab());

  const focusTab = (tabIndex) => {
    const tabRef = tabRefs.current[tabIndex];
    if (tabRef) {
      tabRef.focus();
      setFocusedTabIndex(tabIndex);
    }
  };

  const handleKeyDown = (
    tabIndex,
    { key }
  ) => {
    const { length } = tabRefs.current;
    switch (key) {
      case "ArrowDown": focusTab((tabIndex + 1) % length);          break;
      case "ArrowUp":   focusTab((tabIndex - 1 + length) % length); break;
      case "Home":      focusTab(0);                                break;
      case "End":       focusTab(length - 1);                       break;
      default: break;
    }
  };

  return (
    <div role="tablist" aria-labelledby={ariaLabeledBy}>
      {data.map(({ key, title, subtitle, additionalData }, tabIndex) => (
        <Tab
          key={key}
          id={`tab-${kebabCase(key)}`}
          type="button"
          role="tab"
          tabIndex={focusedTabIndex === tabIndex ? undefined : -1}
          aria-controls={`tabpanel-${kebabCase(key)}`}
          aria-selected={key === selectedTab ? "true" : "false"}
          ref={(el) => {
            if (el !== null) tabRefs.current[tabIndex] = el;
          }}
          onClick={() => {
            setSelectedTab(key);
          }}
          onKeyDown={(e) => {
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key))
              e.preventDefault();
            handleKeyDown(tabIndex, e);
          }}
          selected={key === selectedTab}
        >
          <TabHeader>
            <p>{title}</p>
            {selectedTab === key ? <Check /> : null}
          </TabHeader>
          <TabDescription>
            <Subtitle>{subtitle}</Subtitle>
            <AdditionalData>{additionalData}</AdditionalData>
          </TabDescription>
        </Tab>
      ))}
    </div>
  );
};

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="check"
    style={{ flexShrink: 0 }}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// STYLES

const Tab = styled.button`
  --x-padding: 10px;
  border: none;
  background-color: ${props => props.selected ? "var(--color-lightgrey)" : "transparent"};
  text-align: left;
  width: 100%;
  border-bottom: 1px solid var(--color-grey);
  padding: var(--x-padding) 10px;
  cursor: pointer;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  
  ${
    props => props.selected ? `
      --border-width: 4px;
      border-left: var(--border-width) solid var(--color-crimson);
      padding-left: calc(var(--x-padding) - var(--border-width));
    ` : ''
  }

  &:focus {
    outline-offset: calc(-1 * (var(--x-padding) / 2));
  }
`

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0;

    font-weight: bold;
  }
`

const TabDescription = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 1ch;
  color: #505050;
  font-size: 0.9rem;
`

const Subtitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: italic;

  // Since this subtitle is italic, and there is overflow hidden,
  // need to add padding so the text isn't clipped when it is slanted.
  padding-right: 3px;
`

const AdditionalData = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`