import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const GITBOOK_SPACE_ID = process.env.GATSBY_GITBOOK_SPACE_ID;
const GITBOOK_API_TOKEN = process.env.GATSBY_GITBOOK_API_TOKEN;

const requestOptions = {
  headers: {
    "Authorization": `Bearer ${ GITBOOK_API_TOKEN }`,
  },
};

const pageFields = [
  'title',
  'path',
  'id',
  'documentId',
  'pages',
  'updatedAt',
  'urls',
  'app',
];

export const useDocumentation = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return {
    fetchPageByPath,
    loading,
    pages,
  };
};
