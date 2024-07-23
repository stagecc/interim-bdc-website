import React from "react";
import styled from "styled-components";
import { Meta } from "../typography";

const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const PublishDateByLine = ({date, author, timeToRead}) => {

  return (
    <LineContainer>
      <Meta>
        Published on {date} {' '}
        {author && <span>| Authored by {author}</span>}
      </Meta>
      <Meta>
        {timeToRead} minute read
      </Meta>
    </LineContainer>
  )
}