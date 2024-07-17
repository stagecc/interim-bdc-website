const path = require(`path`);
const readingTime = require('reading-time');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body)
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      timeToRead: Float @proxy(from: "fields.timeToRead.minutes")
      wordCount: Int @proxy(from: "fields.timeToRead.words")
    }
  `);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const articleTemplate = path.resolve(`src/templates/latest-updates/index.jsx`);
  const eventTemplate = path.resolve(`src/templates/events/event-template.js`);
  const upcomingEventsTemplate = path.resolve(
    `src/templates/events/upcoming-events-template.js`
  );
  const eventsArchiveTemplate = path.resolve(
    `src/templates/events/past-events-template.js`
  );

  const results = await graphql(`
    {
      allMdx (
        sort: {frontmatter: {date: ASC}}
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
            fields {
              timeToRead {
                text
                minutes
                time
                words
              }
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (results.errors) {
    console.log('error')
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create news items pages
  const articles = results.data.allMdx.edges.filter(({node}) =>
    node.internal.contentFilePath.includes("/data/latest-updates/")
  );
  articles.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: `${articleTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { 
        id: node.id, 
        // additional data passed via context
        prev: index === 0 ? null : articles[index - 1].node,
        next: index === articles.length - 1 ? null : articles[index + 1].node,
        timeToRead: node.fields.timeToRead
      },
    });
  });
  const events = results.data.allMdx.edges.filter(({node}) =>
    node.internal.contentFilePath.includes("/data/events/")
  )
  events.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: `${eventTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        // additional data passed via context
        prev: index === 0 ? null : events[index - 1].node,
        next: index === events.length - 1 ? null : events[index + 1].node,
      },
    });
  });

  // get date to sort events into upcoming and past event lists
  const todaysDate = new Date();
  const dateString = `${todaysDate.getFullYear()}-${
    todaysDate.getMonth() + 1 < 10 ? "0" : ""
  }${todaysDate.getMonth() + 1}-${
    todaysDate.getDate() < 10 ? "0" : ""
  }${todaysDate.getDate()}`;

  // Create upcoming event list page
  createPage({
    path: "/about/events",
    component: upcomingEventsTemplate,
    context: {
      todaysDate: dateString,
    },
  });

  // Create archived event list page
  createPage({
    path: "/about/events/archive",
    component: eventsArchiveTemplate,
    context: {
      todaysDate: dateString,
    },
  });


  return [...articles, ...events];
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

