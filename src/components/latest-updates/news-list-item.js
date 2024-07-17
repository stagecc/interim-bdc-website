import React from "react";
import styled from "styled-components";
import { Title, Heading, Meta } from "../typography";
import { TagsList } from "../list";
import { TagLink } from "../link";
import { useWindowWidth } from "../../hooks";
import { Link } from "gatsby";


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

const Tags = styled(Meta)``;

const PublishDate = styled.span`
  flex: 1;
`;

const TimeToRead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <TimeToRead>&nbsp; {timeToRead} minute read</TimeToRead>
      </Details>
      <Tags>
        <TagsList
          title="Tags"
          items={tags.map((tag) => (
            <TagLink tag={tag} />
          ))}
        />
      </Tags>
      <main className="news-snippet">{content}</main>
    </ArticlePreview>
  );
};