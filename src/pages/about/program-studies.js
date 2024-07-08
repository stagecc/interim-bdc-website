import React from "react";
import styled from "styled-components";
import { PageContent } from "../../components/layout";
import { QueryCacheProvider } from "../../hooks/use-query";
import { 
  CardSection,
  Programs,
  Studies
} from "../../components/program-studies";
import { kebabCase } from "../../utils/casing";
import { useQueryParams } from "../../hooks/use-query-params";

const ProgramStudies = () => {
  const [program, setProgram] = useQueryParams(null, "program");

  return (
    <PageContent width="95%" maxWidth="1600px" center gutters>
      <QueryCacheProvider>
        <Card>
          <CardSection title={<div id="programs-title">Programs</div>}>
            <Programs
              selectedProgram={program}
              setSelectedProgram={setProgram}
            />
          </CardSection>
          <CardSection
            title={
              <StudiesHeader>
                {`Studies${program === null ? "" : ` - ${program}`}`}
              </StudiesHeader>
            }
            ariaLabeledBy={
              program === null ? undefined : `tab-${kebabCase(program)}`
            }
            id={program === null ? undefined : `tabpanel-${kebabCase(program)}`}
            >
              <Studies programKey={program} />
          </CardSection>
        </Card>
      </QueryCacheProvider>
    </PageContent>
  );
};

export default ProgramStudies;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: calc(100dvh - 250px);
  background-color: white;
  box-shadow: #00000040 0 0 8px 2px;

  --color-white: #eeeeee;
  --color-lightgrey: #edeff4;
  --color-grey: #cccccc;
`;

const StudiesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
