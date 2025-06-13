import { useEffect, useState } from "react";
import axios from "axios";

const FRESHDESK_API_ROOT = process.env.GATSBY_FRESHDESK_API_ROOT_URL;

const requestOptions = {
  "Accept": "application/json",
};

export const useFaqs = (category) => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchArticles = async () => {
      await axios
        .get(`${FRESHDESK_API_ROOT}/faqs`, requestOptions)
        .then((response) => {
          // an article's status is either 1 or 2, for draft or published, respectively.
          // we'll filter here for only the published articles.
          const newArticles = response.data.filter(article => article.status === 2);
          setArticles(newArticles)
        })
        .catch((error) => {
          setErrorMessage("An error occurred while fetching articles from Freshdesk.");
        })
        .finally(() => setLoading(false));
    };
    
    fetchArticles();
  }, []);

  return { articles, errorMessage, loading };
};
