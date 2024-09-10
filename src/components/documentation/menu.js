import React, { Fragment } from 'react';

export const DocumentationMenu = ({ pageTree = {}, level = 0 }) => {
  return (
    <div>
      {
        pageTree.map(item => (
          <div
            key={ item.id }
            style={{ paddingLeft: `calc(0.5rem * ${ level })` }}
          >
            {
              item?.pages?.length > 0 ? (
                <Fragment>
                  <details>
                    <summary style={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}>{ item.title }</summary>
                    <DocumentationMenu pageTree={ item.pages } level={ level + 1 } />
                  </details>
                </Fragment>
              ) : (
                <Fragment>
                  • <a href={ `#/${ item.path }` }>{ item.title }</a>
                </Fragment>
              )
            }
          </div>
        ))
      }
    </div>
  );
};
