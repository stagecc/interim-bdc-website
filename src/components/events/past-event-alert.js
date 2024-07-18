import React, { Fragment } from "react";
import { Link } from "../../components/link";
import { Meta } from "../../components/typography";
import { Card, CardBody } from "../../components/card";

export const PastEventAlert = ({forum_post}) => {
  return (
      <Card metaAlert>
        <CardBody style={{backgroundColor: 'rgba(237, 240, 244, 0.8)' }}>
          <Meta>
            This event has passed. {forum_post && (
              <span>
                To view session materials click <Link to={ forum_post }>
                  here
                </Link>
              .
              </span>
              )}
          </Meta>
        </CardBody>
      </Card>
  )
}
