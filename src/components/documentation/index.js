import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
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

export const Documentation = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);

  /**
   * useEffect hook to fetch the page data from the GitBook API when the component mounts.
   * 
   * This effect is triggered only once, on component mount.
   * It requests doc page/navigation structure for our documentation space from the GitBook API.
   * The returned data is stored in the local `pages` state variable.
   * 
   * If no pages are returned in the API response, it logs an error message to the console.
   * 
   * - The fetched page tree is parsed and filtered using `pageFields` before being saved.
   * 
   * @returns {void} This effect does not return any value.
   */
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

  /**
   * useMemo hook to compute a flattened map of page paths to page IDs.
   *
   * This hook memoizes the result of flattening the `pages` tree structure
   * using the `flattenPageTree` function. If `pages` is falsy, an empty
   * object is returned. The memoized value is recalculated whenever the
   * `pages` array changes.
   *
   * @type {Object<string, string|number>} An object where each key is a page
   *    path and each value is the corresponding page ID.
   * @param {Array<Object>} pages - The array of page objects, each having
   *    at least `path` and `id` properties.
   */
  const pageMap = useMemo(() => {
    if (!pages) {
      return {};
    }
    return flattenPageTree(pages)
  }, [pages]);
  
  /**
   * useCallback hook to fetch a specific page by its ID from the GitBook API.
   *
   * This function requests a page's content based on its `pageId`. The
   * function handles setting a loading state while fetching the page data.
   * 
   * If the `pageId` is falsy, the function bails out early, returning an empty
   * object without making a request. If no data is found in the response,
   * an error is logged to the console and an empty object gets returned.
   *
   * @param {string} pageId - The ID of the page to fetch.
   * @param {string} [format='markdown'] - The format of the content to fetch (we default this to 'markdown').
   * @param {boolean} [metadata=true] - Whether to include metadata in the API response (we default this to `true`).
   * @returns {Promise<Object>} A promise that resolves to the page data if successful, or an empty object if an error occurs.
   */
  const fetchPageById = useCallback(async (
    pageId,
    format = 'markdown',
    metadata = true,
  ) => {
    if (!pageId) {
      return {};
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

  // tracks the visibility of the side menu: `true` if visible, `false` if hidden.
  const [visibleMenu, setVisibleMenu] = useState(false);

  /**
   * ToggleButton component that toggles the visibility of the navigation menu.
   *
   * This memoized component renders an button that, when clicked, toggles the
   * `visibleMenu` state, and we rerender upon changes to `visibleMenu`.
   * 
   * @component
   * @returns {JSX.Element} A button that toggles the visibility of a menu.
   */
  const ToggleButton = useCallback(() => (
    <IconButton
      color="primary"
      onClick={ () => setVisibleMenu(!visibleMenu) }
    >
      <MenuIcon />
    </IconButton>
  ), [visibleMenu]);

  return (
    <QueryCacheProvider>
      <DocumentationContext.Provider value={{ fetchPageById, loading, pageMap, pages }}>
        <Stack
          direction="row"
          gap={ 2 }
          sx={{ position: 'relative' }}
        >
          <Stack 
            direction="row"
            gap={ 1 }
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              py: '4.75rem',
              position: 'sticky',
              top: '5rem',
              alignSelf: 'flex-start',
              flex: visibleMenu ? '1 0' : 'unset',
              minWidth: visibleMenu ? '400px' : '40px',
              transition: 'min-width 250ms',
            }}
          >
            <ToggleButton />
            { visibleMenu && <DocumentationMenu pageTree={ pages } /> }
          </Stack>
          <Box sx={{ flex: '2 1' }}>
            <DocumentationPageContent />
          </Box>
        </Stack>
      </DocumentationContext.Provider>
    </QueryCacheProvider>
  )
};

/**
 * Flattens a hierarchical page tree into a flat object with
 * paths as keys and page IDs as values.
 *
 * This function traverses through a tree structure of pages,
 * recursively processing nested pages, and returns an object
 * where the keys are the paths of the pages and the values are
 * their corresponding IDs.
 *
 * @param {Array<Object>} pages - An array of page objects to flatten. 
 *    Each page object should contain at least the following properties:
 *    - `id` {string|number}: The unique identifier for the page.
 *    - `path` {string}: The path representing the page's location.
 *    - `pages` {Array<Object>} [optional]: Nested array of child pages,
 *          each following the same structure.
 * @returns {Object} An object where each key is a page's path and each
 *    value is the corresponding page's ID.
 *    Resulting object shape: {
 *      "master": "-LwOmmJ2ZPDnlgAIaD3n",
 *      "community": "-M4QvK5OHkwKZS9FUmXX",
 *      "community/statement-of-conduct": "-M4QvK5PCRgguRIAqyZg",
 *      "community/who-we-are": "-M5S9tHtNc7SdMprltlf",
 *      // etc.
 *    }
 */
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
