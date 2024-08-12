import React from "react";
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { Heading, Meta } from "../typography";
import { TagsList } from "../list";
import { Link } from "../link";
import { ClockIcon } from "../icons";

const TagLink = styled(Link)
.attrs(({ children }) => ({
  to: `/tagged/${children}`,
}))`
  background-color: var(--color-sky);
  border: 1px solid var(--color-blueberry-light);
  color: #222;
  padding: 2px 4px;
  text-decoration: none;
  filter: brightness(1.0);
  transition: filter 250ms;
  &:hover {
    text-decoration: none;
    filter: brightness(1.05);
  }
`;

const ArticlePreview = styled.article`
  margin: 4rem 0;
`;

const Details = styled(Meta)`
  display: flex;
  flex-direction: ${(props) => (props.compact ? "column" : "row")};
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

const PublishDate = styled.span`
  flex: 1;
`;

const TimeToRead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const NewsListItem = ({ date, path, title, timeToRead, tags, content }) => {
  const { isCompact } = useWindowWidth();
  return (
    <ArticlePreview>
      <Heading style={{ lineHeight: 1.5 }}>
        <Link to={path}>{title}</Link>
      </Heading>
      <Details compact={isCompact}>
        <PublishDate>Published on {date}</PublishDate>
        <TimeToRead>
          <ClockIcon size={ 16 } fill="var(--color-grey)" />
          <span>{timeToRead} minute read</span>
        </TimeToRead>
      </Details>
      <TagsList
        title="Tags"
        separator={ <span>&nbsp;&nbsp;</span> }
        items={tags.map(tag => <TagLink key={ `${date}-${tag}` }>{tag}</TagLink>)}
      />
      <main className="news-snippet">{content}</main>
    </ArticlePreview>
  );
};