import React from "react";
import PropTypes from "prop-types";
import { OrderedList, UnorderedList } from './'

//


export const List = ({ children, ordered, ...props }) => {
  const ListComponent = ordered ? OrderedList : UnorderedList;
  return <ListComponent {...props}>{children}</ListComponent>;
};

List.propTypes = {
  dense: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  ordered: PropTypes.bool.isRequired,
};

List.defaultProps = {
  dense: false,
  children: PropTypes.node.isRequired,
  ordered: false,
};
