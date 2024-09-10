import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useDocumentation } from './';
import { LoadingSpinner } from '../loading';
import { useLocation } from '@reach/router';
import { Heading, Meta } from "../typography";
import { useQueryCache } from '../../hooks';

export const DocumentationPageContent = () => {
  const docsCache = useQueryCache();
  const location = useLocation();
  const { fetchPageById, loading, pageMap } = useDocumentation();
  const [pageContent, setPageContent] = useState(null);

  // update content based on current hash string in URL.
  // `master` is the hidden path given to the root doc
  // page in GitBook, so we use that as our default.
  useEffect(() => {
    const updateContent = async () => {
      const path = location.hash ? location.hash.replace(/^#\//, '') : 'master';
      const pageId = pageMap[path];
      const cachedContent = docsCache.get(pageId);
      if (cachedContent) {
        setPageContent(cachedContent);
        return;
      }
      const newContent = await fetchPageById(pageId);
      setPageContent(newContent);
      docsCache.set(pageId, newContent);
    }
    updateContent();
  }, [docsCache, fetchPageById, location.hash, pageMap]);

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Fragment>
      <Heading noMargin>{ pageContent?.title ?? 'Documentation Page' }</Heading>
      
      <Meta>Updated: { pageContent.updatedAt }</Meta>

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
