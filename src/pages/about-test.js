import React from "react";
import { useFetchContent } from "../hooks";
import { PageContent } from "../components/layout";
import { ContentBlock } from "../components/content/content-block";
import { NextStepsCard } from "../components/card";

const AboutTestPage = () => {
  const { data } = useFetchContent("pages/about/overview/page.yaml");

  return (
    <PageContent title="About BioData Catalyst® (BDC)" menuItems={data?.menu}>
      <ContentBlock path="pages/about/overview/main.md" />
      <NextStepsCard>
        <ContentBlock path="pages/about/overview/next-steps.md" />
      </NextStepsCard>
    </PageContent>
  );
};

export default AboutTestPage;
