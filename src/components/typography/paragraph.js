import styled from "styled-components";
import PropTypes from "prop-types";

export const Paragraph = styled.p(({ left, center, right, noMargin }) => (`
  text-align: inherit;
  ${ noMargin && "margin-top: 0; margin-bottom: 0;" }
  font-weight: 400;
  line-height: 1.5;
  ${ left && "text-align: left;" }
  ${ center && "text-align: center;" }
  ${ right && "text-align: right;" }
`));

Paragraph.propTypes = {
  children: PropTypes.node,

};
