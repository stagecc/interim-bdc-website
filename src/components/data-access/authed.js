import React, { Fragment } from "react";
import styled from 'styled-components';
import { useFence } from "../../hooks";
import { DownloadIcon } from "../icons";
import { Button } from "../buttons";
import { Subheading, Paragraph } from "../typography";
import { LoadingSpinner } from "../loading";

const ProjectList = styled.select`
  width: 100%;
`;

const ProjectOption = styled.option`
  padding: 0.5rem;
`;

const DownloadButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--color-blueberry);
  text-transform: none;
`;

export const Authed = () => {
  const { user, projects } = useFence();

  console.log({user});
  if (!user) {
    return <LoadingSpinner />
  }

  const handleDownload = () => {
    const csvData = `Project\n${projects.join(`\n`)}`;
    const url = window.URL.createObjectURL(
      new Blob([csvData], { type: "text/csv" })
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", `${user.name}-projects.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };

  return (
    <div>
      <Subheading>You are logged in as {user.name}</Subheading>
      {projects.length ? (
        <Fragment>
          <Paragraph>
            You have access to {projects.length} projects.
          </Paragraph>
          <ProjectList size="3">
            {projects.map(project => (
              <ProjectOption key={project}>{project}</ProjectOption>
            ))}
          </ProjectList>
          <br />
          <br />
          <Paragraph>
            <DownloadButton onClick={handleDownload}>
              <span>Download Project List</span>&nbsp;&nbsp;
              <DownloadIcon size="24" fill="#fff" />
            </DownloadButton>
          </Paragraph>
        </Fragment>
      ) : (
        <Paragraph>You don't have access to any projects yet.</Paragraph>
      )}
    </div>
  )
}
