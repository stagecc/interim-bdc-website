import { useEffect, useState } from 'react';
import axios from 'axios';

const GITBOOK_SPACE_ID = process.env.GATSBY_GITBOOK_SPACE_ID;
const GITBOOK_API_TOKEN = process.env.GATSBY_GITBOOK_API_TOKEN;

const requestOptions = {
  headers: {
    "Authorization": `Bearer ${ GITBOOK_API_TOKEN }`,
  },
};

export const useDocumentation = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.get(`https://api.gitbook.com/v1/spaces/${ GITBOOK_SPACE_ID }/content`, requestOptions);
      const { data } = await response;
      if (!data) {
        return
      }
      setContent(data);
    };

    fetchContent();
  }, []);

  console.log(content);

  return {
    content,
  };
};
