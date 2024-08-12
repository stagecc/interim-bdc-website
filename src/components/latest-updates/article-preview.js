import React from "react";
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { Heading, Meta } from "../typography";
import { Link } from "../link";
import { TagsList } from "../tags";
import { ClockIcon } from "../icons";


const Wrapper = styled.article`
  margin: 4rem 0;
`;

const Details = styled(Meta)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

const PublishDate = styled.span`
  flex: 1;
`;

const TimeToRead = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const Excerpt = styled.div`
  line-height: 2;
`;

export const ArticlePreview = ({
  excerpt,
  fields: {
    timeToRead,
  },
  frontmatter: {
    date,
    path,
    tags,
    title,
  },
 }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Wrapper>
      <Heading style={{ lineHeight: 1.5 }}>
        <Link to={path}>{title}</Link>
      </Heading>
      <Details compact={isCompact}>
        <PublishDate>Published on {date}</PublishDate>
        <TimeToRead>
          <ClockIcon size={ 16 } fill="var(--color-grey)" />
          <span>{timeToRead.text}</span>
        </TimeToRead>
      </Details>
      <TagsList tags={ tags } />
      <Excerpt>{excerpt}</Excerpt>
    </Wrapper>
  );
};