/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `BioData Catalyst`,
    shortTitle: `BDC`,
    description: `BioData Catalyst serves as a cloud-based platform of tools, applications, and workflows to help NHLBI research investigators securely find, access, share, store, cross-link, and compute on large scale data sets,`,
    author: `BioData Catalyst`,
    keywords: [
      "data",
      "cloud",
      "computing",
      "research",
      "platform",
      "NIH",
      "NHLBI",
      "discovery",
      "science",
      "diagnostic tools",
      "therapeutic options",
      "prevention strategies",
      "heart",
      "lung",
      "blood",
      "sleep",
      "disorders",
    ],
    siteUrl: "https://biodatacatalyst.nhlbi.nih.gov/",
    twitterUsername: "",
  },  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `biodata-catalyst`,
        short_name: `bdc`,
        start_url: `/`,
        background_color: `#c1272d`,
        theme_color: `#c1272d`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'pages',
        'path': './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
  ]
};