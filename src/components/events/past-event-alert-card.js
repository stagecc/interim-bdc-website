import React from "react";
import { Heading } from "../../components/typography";
import { Card, CardBody } from "../../components/card";
import { Link } from "../../components/link";

export const PastEventAlert = ({forum_post}) => (
  <Card style={{
    margin: '2rem auto',
    width: '100%',
    maxWidth: '85%',
  }}>
    <CardBody>
      <Heading>This event has passed!</Heading>
      {forum_post && (
        <span>
          To view session materials click <Link to={ forum_post }>
          here
          </Link>
          .
        </span>
      )}

    </CardBody>
  </Card>
)
