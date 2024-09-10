import React, { useEffect, useState } from "react";
import { Box, Stack } from '@mui/material';
import { Heading } from "../typography";
import { useDocumentation } from "../../hooks";
import { LoadingSpinner } from '../loading';
import { DocumentationMenu } from './menu';
import { useLocation } from '@reach/router'


export const Documentation = () => {
  const location = useLocation()
  const { fetchPageByPath, loading, pages } = useDocumentation();
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    const updateContent = async () => {
      const path = location.hash ? location.hash.replace(/^#/, '') : 'master';
      const newContent = await fetchPageByPath(path);
      setPageContent(newContent);
    }
    updateContent();
  }, [fetchPageByPath, location.hash]);

  if (!pages.length || loading) {
    return <LoadingSpinner />
  }

  return (
    <Stack direction="row" gap={ 1 }>
      <Box sx={{ flex: 1 }}>
        <DocumentationMenu pageTree={ pages } />
      </Box>
      <Box sx={{
        flex: '2 1',
      }}>
        <Heading noMargin>{ pageContent?.title ?? 'Documentation Page' }</Heading>
        <br />
        <Box component="pre" sx={{
          border: '1px dashed salmon',
          backgroundColor: 'papayawhip',
          padding: '1rem',
          fontSize: '75%',
        }}>
          { JSON.stringify(pageContent, null, 2) }
        </Box>
      </Box>
    </Stack>
  );
};
