import { useEffect, useState } from "react";
import axios from "axios";

const FRESHDESK_API_ROOT = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;

const FRESHDESK_CATEGORY = {
  GENERAL: "60000157358",
  FELLOWS: "60000294708",
};

const requestOptions = {
  "Accept": "application/json",
  auth: { username: FRESHDESK_API_KEY, password: "X" },
};

export const useFaqs = (category) => {
  const categoryId = FRESHDESK_CATEGORY?.[category];
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!categoryId) {
      return;
    }

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
  }, [categoryId]);

  return { articles, errorMessage, loading };
};
