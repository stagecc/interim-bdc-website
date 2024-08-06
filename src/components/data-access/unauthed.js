import React, { Fragment } from "react";
import { useFence } from "../../hooks";
import { ButtonLink } from "../buttons";

export const Unauthed = () => {
  const { checkAccessUrl } = useFence();
  
  return (
    <ButtonLink
      to={ checkAccessUrl }
      style={{ width: 'unset' }}
    >Check My Access</ButtonLink>
  )
}
