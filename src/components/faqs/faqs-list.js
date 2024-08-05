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
import { LoadingDots } from "../loading";
import { useFaqs } from '../../hooks';

export const FaqsCardList = () => {
  const faqs = useFaqs('GENERAL');

  if (faqs.errorMessage) {
    return (
      <Card>
        <ErrorMessage center>{faqs.errorMessage}</ErrorMessage>
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

  if (faqs.loading) {
    return <LoadingDots
      color="var(--color-crimson)"
      text="Loading..."
      textPlacement="top"
    />
  }

  return faqs.folders.map(folder => {
    return (
      <Card key={folder.id}>
        <CardHeader>{folder.name}</CardHeader>
        {folder.articles && (
          <CardBody style={{ padding: 0 }}>
            {folder.articles.map((article, i) => (
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
        )}
      </Card>
    );
  });
};
