import styled from "styled-components";
import PropTypes from "prop-types";

export const Button = styled.button(
  ({ $small = false, $light = false, $fullWidth = false, ...props }) => `
    background-color: ${$light ? "#fff" : "var(--color-crimson)"};
    border-radius: 4px;
    display: inline-block;
    border-width: 1px;
    border-style: solid;
    border-color: ${$light ? "var(--color-crimson)" : "transparent"};
    color: ${$light ? "var(--color-crimson) !important" : "#fff"};
    padding: ${$small ? "0.5rem 1rem" : "1rem 1rem"};
    font-size: ${$small ? "80%" : "100%"};
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    cursor: pointer;
    // possibly extend to allow fullWidth prop?
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${$fullWidth ? `100%` : `unset`};
    position: relative;
    transition: filter 250ms;
    &:hover, &:focus {
      filter: brightness(1.2);
    }
    &:disabled {
      filter: saturate(0.25) brightness(1.5);
    }
    text-wrap: wrap;
  `
);

Button.propTypes = {
  light: PropTypes.bool,
  small: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
