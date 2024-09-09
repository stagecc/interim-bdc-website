import React, { useState } from "react";
import { Stack } from '@mui/material';
import { useDocumentation } from "../../hooks";
import { Link } from '../link';
import { LoadingSpinner } from '../loading';

export const Documentation = () => {
  const { content } = useDocumentation();
  const [page, setPage] = useState(null);

  if (!content) {
    return <LoadingSpinner />
  }

  return (
    <Stack direction="row" sx={{ border: '2px dashed navy' }}>
      <div style={{ flex: '1 0 300px' }}>
        {
          content && content.pages.map(page => (
            <div key={ page.id }>
              <Link to={ '#' }>{ page.title }</Link>
            </div>
          ))
        }
      </div>
      <pre style={{ flex: 1, fontSize: '80%' }}>
        { JSON.stringify(content, null, 2) }
      </pre>
    </Stack>
  );
};
