const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const articleTemplate = path.resolve(`src/templates/latest-updates/index.jsx`);

  const newsResults = await graphql(`
    {
      allMdx (
        sort: {frontmatter: {date: ASC}}
        filter: {internal: {contentFilePath: {regex: "/data/latest-updates/"}}}
      ) {
        edges {
          node {
            id
            body
            frontmatter {
              path
              title
              date(formatString: "MMMM DD, YYYY")
              tags
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (newsResults.errors) {
    console.log('error')
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create news items pages
  const articles = newsResults.data.allMdx.edges
  articles.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: `${articleTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { 
        id: node.id, 
        // additional data passed via context
        prev: index === 0 ? null : articles[index - 1].node,
        next: index === articles.length - 1 ? null : articles[index + 1].node,
      
      },
    });
  });

  return [...articles];
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@nivo/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

