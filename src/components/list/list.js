import React from "react";
import PropTypes from "prop-types";
import { OrderedList, UnorderedList } from './'

//


export const List = ({
  children,
  ordered = false,
  dense = false,
  ...props
}) => {
  const ListComponent = ordered ? OrderedList : UnorderedList;
  return <ListComponent {...props}>{children}</ListComponent>;
};

List.propTypes = {
  dense: PropTypes.bool,
  children: PropTypes.node.isRequired,
  ordered: PropTypes.bool,
};

