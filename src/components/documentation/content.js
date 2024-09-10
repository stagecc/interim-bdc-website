import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useDocumentation } from './';
import { LoadingSpinner } from '../loading';
import { useLocation } from '@reach/router';
import { Heading } from "../typography";

export const DocumentationPageContent = () => {
  const location = useLocation();
  const { fetchPageByPath, loading } = useDocumentation();
  const [pageContent, setPageContent] = useState(null);

  // update content based on current hash string in URL.
  // `master` is the hidden path given to the root doc
  // page in GitBook, so we use that as our default.
  useEffect(() => {
    const updateContent = async () => {
      const path = location.hash ? location.hash.replace(/^#/, '') : 'master';
      const newContent = await fetchPageByPath(path);
      setPageContent(newContent);
    }
    updateContent();
  }, [fetchPageByPath, location.hash]);

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Fragment>
      <Heading noMargin>{ pageContent?.title ?? 'Documentation Page' }</Heading>
      
      <br />

      <Box component="pre" sx={{
        backgroundColor: 'papayawhip',
        padding: '1rem',
        fontSize: '75%',
        whiteSpace: 'pre-wrap'
      }}>
        { JSON.stringify(pageContent, null, 2) }
      </Box>
    </Fragment>
  );
};
