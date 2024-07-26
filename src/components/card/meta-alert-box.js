import React from "react";
import styled from "styled-components";
import { Meta } from "../../components/typography";
import { Card, CardBody } from "../../components/card";

const MetaCardBody = styled(CardBody)`
  background-color: rgba(237, 240, 244, 0.8);
`

export const MetaAlertBox = ({children}) => (
  <Card metaAlert>
    <MetaCardBody>
      <Meta>
        {children}
      </Meta>
    </MetaCardBody>
  </Card>
)
