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
  },  
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Roboto:300,400,500,600"],
        },
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site { siteMetadata { siteUrl } }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        resolveSiteUrl: ({
          site: { siteMetadata: { siteUrl: siteUrl } }
        }) => {
          return siteUrl;
        },
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }) => {
          return allPages;
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://biodatacatalyst.nhlbi.nih.gov',
        sitemap: 'https://biodatacatalyst.nhlbi.nih.gov/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
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
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `1000`,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h2`, `h3`],
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
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/latest-updates`,
        name: "latest-updates",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/events`,
        name: "events",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/publications`,
        name: "publications",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `eep-headshots`,
        path: `./src/data/eep-headshots`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-T5R9BX5J",
  
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
  
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     trackingIds: ["G-2M4JYYSBD3"],
    //   },
    //   gtagConfig: {
    //     cookieFlags: 'SameSite=None;Secure',
    //   },
    //   pluginConfig: {
    //     head: true,
    //   },
    // },
  ]
};