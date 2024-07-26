import React from "react";
import { Link } from "../../components/link";
import { MetaAlertBox } from "../../components/card";

export const PastEventAlert = ({forum_post}) => {
  return (
    <MetaAlertBox>
      This event has passed. {forum_post && (
        <span>
          To view session materials click <Link to={ forum_post }>
          here
          </Link>
          .
        </span>
      )}
    </MetaAlertBox>
  )
}
