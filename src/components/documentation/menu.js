import React, { Fragment } from 'react';

const MenuItem = ({ item, level = 0 }) => {
  if (item?.pages?.length > 0) {
    return (
      <details>
        <summary style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>{ item.title }</summary>
        <DocumentationMenu pageTree={ item.pages } level={ level + 1 } />
      </details>  
    )
  }
  return <Fragment>▹ <a href={ `#/${ item.path }` }>{ item.title }</a></Fragment>;
};

export const DocumentationMenu = ({
  pageTree = [],
  level = 0,
}) => {
  return (
    <div>
      { pageTree.map(item => (
        <div
          key={ item.id }
          style={{ padding: '0.25rem', marginLeft: `calc(0.75rem * ${ level })` }}
        >
          <MenuItem item={ item } level={ level } />
        </div>
      )) }
    </div>
  );
};
