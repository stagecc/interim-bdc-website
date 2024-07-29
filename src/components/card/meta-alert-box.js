import React from "react";
import styled from "styled-components";
import { Meta } from "../../components/typography";
import { Card, CardBody } from "../../components/card";

const MetaCardBody = styled(CardBody)`
  padding: 0;
`

const MetaAlertCard = styled(Card)`
  margin-top: 2rem;
  padding: 0;
`

export const MetaAlertBox = ({children}) => (
  <MetaAlertCard metaAlert>
    <MetaCardBody>
      <Meta style={{padding: 0}}>
        {children}
      </Meta>
    </MetaCardBody>
  </MetaAlertCard>
)
