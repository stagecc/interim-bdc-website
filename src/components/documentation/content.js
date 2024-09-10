import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import Markdown from "react-markdown";
import { useDocumentation } from './';
import { useQueryCache } from '../../hooks';
import { Link } from '../link';
import { LoadingSpinner } from '../loading';
import { Meta } from "../typography";
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

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
      <Meta style={{ textAlign: 'right' }}>
        <Link to={ `https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/${location.hash.replace(/^#\//, '')}` }>View in GitBook</Link>
        <br />
        Updated: { pageContent.updatedAt }
      </Meta>

      <Markdown remarkPlugins={[ remarkFrontmatter, remarkGfm ]}>
        { pageContent.markdown }
      </Markdown>
    </Fragment>
  );
};
