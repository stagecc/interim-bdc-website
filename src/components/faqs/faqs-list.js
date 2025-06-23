import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Paragraph,
  ErrorMessage
} from "../typography";
import { Card, CardHeader, CardBody } from "../card";
import { Link } from "../link";
import { LoadingSpinner } from "../loading";
import { useFaqs } from '../../hooks';
import { kebabCase } from '../../utils';

export const FaqsCardList = () => {
  const { errorMessage, articles, loading } = useFaqs();

  if (errorMessage) {
    return (
      <Card>
        <ErrorMessage center>{errorMessage}</ErrorMessage>
        <Paragraph center>
          View our FAQs directly at{" "}
          <Link to="https://bdcatalyst.freshdesk.com/">
            bdcatalyst.freshdesk.com
          </Link>
          .
        </Paragraph>
      </Card>
    );
  }

  if (loading || !articles) {
    return <LoadingSpinner height="400px" />
  }


  return (
    <Card>
      <CardHeader>BDC Frequently Asked Questions</CardHeader>
      <CardBody style={{ padding: 0 }}>
        {articles.map(article => {
          const articleId = kebabCase(article.title)
          return (
            <Accordion key={`faq-${article.title}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={articleId + '-content'}
                id={articleId + '-header'}
              >{article.title}</AccordionSummary>
              <AccordionDetails
                component="div"
                dangerouslySetInnerHTML={{__html: article.description}}
              />
            </Accordion>
          )
      })}
      </CardBody>
    </Card>
  );
};
