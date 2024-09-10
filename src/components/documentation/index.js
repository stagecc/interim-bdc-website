import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  'documentId',
  'pages',
  'updatedAt',
];

const DocumentationContext = createContext({ });
export const useDocumentation = () => useContext(DocumentationContext);

export const Documentation = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const { data } = await axios.get(`https://api.gitbook.com/v1/spaces/${ GITBOOK_SPACE_ID }/content`, requestOptions);
      if (!data?.pages) {
        console.error('An error occurred while fetching documentation pages.');
        return [];
      }
      const pageTree = JSON.parse(JSON.stringify(data.pages, pageFields));
      setPages(pageTree);
    };

    fetchPages();
  }, []);

  const fetchPageByPath = useCallback(async url => {
    setLoading(true);
    const _url = `https://app.gitbook.com/s/-LwOmaDlbanAQ-7fhd89${ url }`;
    const response = await axios.get(
      `https://api.gitbook.com/v1/urls/content`,
      { params: { url: _url }, ...requestOptions }
    );
    const { data } = await response;
    if (!data?.page) {
      console.error('An error occurred while fetching a documentation page.');
      return {};
    }
    setLoading(false);
    return data.page;
  }, []);

  return (
    <QueryCacheProvider>
      <DocumentationContext.Provider value={{ fetchPageByPath, loading, pages }}>
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
