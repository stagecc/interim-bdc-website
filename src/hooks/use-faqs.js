import { useEffect, useState } from "react";
import axios from "axios";

const FRESHDESK_API_ROOT = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;

const FRESHDESK_CATEGORY = {
  GENERAL: "60000157358",
  FELLOWS: "60000294708",
};

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_API_KEY, password: "X" },
};

export const useFaqs = (category) => {
  const categoryId = FRESHDESK_CATEGORY?.[category];
  const [folders, setFolders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!categoryId) {
      return;
    }

    const fetchArticles = async () => {
      await axios
        .get(`${FRESHDESK_API_ROOT}/solutions/categories/${categoryId}/folders`, requestOptions)
        .then((response) => {
          const folders = response.data.sort((f, g) => f.name > g.name);
          folders.map((folder) =>
            axios
              .get(`${FRESHDESK_API_ROOT}/solutions/folders/${folder.id}/articles`, requestOptions)
              .then((response) => {
                // an article's status is either 1 or 2, for draft or published, respectively.
                // we'll filter here for only the published articles.
                folder.articles = response.data.filter(article => article.status === 2);
                setFolders([...folders])
              })
          );
        })
        .catch((error) => {
          setErrorMessage("An error occurred while fetching articles from Freshdesk.");
        })
        .finally(() => setLoading(false));
    };
    
    fetchArticles();
  }, [categoryId]);

  return { folders, errorMessage, loading };
};
