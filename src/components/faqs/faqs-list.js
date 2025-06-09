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

export const FaqsCardList = () => {
  const { errorMessage, articles, loading } = useFaqs('GENERAL');

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

  return articles.map(article => {
    return (
      <Card key={article.id}>
        <CardHeader>BDC Frequently Asked Questions</CardHeader>
          <CardBody style={{ padding: 0 }}>
            {articles.map((article, i) => (
              <Accordion key={article.title + i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={article.title + "-content"}
                  id={article.title}
                >
                  {article.title}
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article.description,
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </CardBody>
      </Card>
    );
  });
};
