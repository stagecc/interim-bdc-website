import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { QueryCacheProvider } from '../../hooks';
import { DocumentationMenu } from './menu';
import { DocumentationPageContent } from './content';
import { Box, Stack } from '@mui/material';

const GITBOOK_SPACE_ID = process.env.GATSBY_GITBOOK_SPACE_ID;
const GITBOOK_API_TOKEN = process.env.GATSBY_GITBOOK_API_TOKEN;

const requestOptions = {
  headers: {
    "Authorization": `Bearer ${ GITBOOK_API_TOKEN }`,
  },
};

// this array of fields will be extracted from the page
// objects returned from GitBook.
const pageFields = [
  'title',
  'path',
  'id',
  'pages',
];

const DocumentationContext = createContext({ });
export const useDocumentation = () => useContext(DocumentationContext);

const flattenPageTree = pages => {
  let result = {};
  function recurse(tree) {
    for (const page of tree) {
      // Add the current page's ID and path to the result
      result[page.path] = page.id;

      // If the page has nested pages, recurse into them
      if (page.pages && page.pages.length > 0) {
        recurse(page.pages);
      }
    }
  }
  recurse(pages);
  return result;
}

export const Documentation = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const { data } = await axios.get(
        `https://api.gitbook.com/v1/spaces/${ GITBOOK_SPACE_ID }/content`,
        requestOptions
      );
      if (!data?.pages) {
        console.error('An error occurred while fetching documentation pages.');
        return [];
      }
      const pageTree = JSON.parse(JSON.stringify(data.pages, pageFields));
      setPages(pageTree);
    };

    fetchPages();
  }, []);

  const pageMap = useMemo(() => {
    if (!pages) {
      return;
    }
    return flattenPageTree(pages)
  }, [pages]);

  const fetchPageById = useCallback(async (
    pageId,
    format = 'markdown',
    metadata = true,
  ) => {
    if (!pageId) {
      return;
    }
    setLoading(true);
    const response = await axios.get(
      `https://api.gitbook.com/v1/spaces/${ GITBOOK_SPACE_ID }/content/page/${ pageId }`,
      { params: { format, metadata }, ...requestOptions }
    );
    const { data } = await response;
    if (!data) {
      console.error('An error occurred while fetching a documentation page.');
      return {};
    }
    setLoading(false);
    return data;
  }, []);

  return (
    <QueryCacheProvider>
      <DocumentationContext.Provider value={{ fetchPageById, loading, pageMap, pages }}>
        <Stack direction={{ sm: 'column', md: 'row' }} gap={ 2 }>
          <Box sx={{ flex: '1 0', pt: 8 }}>
            <DocumentationMenu pageTree={ pages } />
          </Box>
          <Box sx={{ flex: '2 1' }}>
            <DocumentationPageContent />
          </Box>
        </Stack>
      </DocumentationContext.Provider>
    </QueryCacheProvider>
  )
};
