# Biodata Catalyst Interim Website

## Overview

This is the public-facing website for the BioData Catalyst Coordinating Center. This site is built with [Gatsby](https://www.gatsbyjs.org), which is a free and open source framework based on [React](https://reactjs.org).


## Contributing

Portions of the content on this website will change frequently and often without the knowledge of overseeing bodies, so it is imperative that associated teams, partners, and platforms take part in keeping it up-to-date.

Please follow the following procedures for requesting changes to the site.
Features will first be made available on a branch deployment before merging into the `staging` branch.
Once a change has been approved and merged, it will first be deployed to [staging.biodatacatalyst.nhlbi.nih.gov](staging.biodatacatalyst.nhlbi.nih.gov) for a final review.
After all relevant parties are in agreement, the change will be merged into the `master` branch and deployed to the production site on a reasonable time schedule. 

### Content Change Requests

Request content changes via [issues](https://github.com/stagecc/bdc3-website-public/issues) with with the `content` label.

### Feature Requests

Often, new feature development requires a bit more thgouht and time to implement than content changes,
but they still should follow essentially the same procedue:
create an [issue](https://github.com/stagecc/bdc3-website-public/issues) with the label `feature`.

## Development

If you would like to contribute to the development of this site, feel free to propose changes with pull requests. As the `master` branch will always represent the deployed production version of the site, please branch feature branches off this branch. 

For local development you will need [Node.js v20+](https://nodejs.org/).
After cloning this repo, execute `npm i` from the project root to spin up the development server,
and view the app in your browser on port `8000`.

Before submitting a pull request, please ensure your changes will build successfully. To test this execute

- `npm run clean` (clears cached files),
- `npm run build` (builds site), and
- `npm run serve` (serves build files on port 9000)

## Data

details to come.

### MDX

...

### Dug

...

### Freshdesk

...

## Deployment

This site is deployed in an [AWS S3 bucket](https://aws.amazon.com/s3/). Using [AWS CodeBuild](https://aws.amazon.com/codebuild/),
the deployment process is automated.
Changes to the `staging` and `main` branches trigger a build and deployment to `https://staging.biodatacatalyst.nhlbi.nih.gov/`, and `https://biodatacatalyst.nhlbi.nih.gov/`, respectively. The statuses of current and previous builds are visible from within the [AWS Console](console.aws.amazon.com/). This automated build and deployment are managed via the `buildspec.yml` file in the project root; do not delete this file.

## Resources

- [AWS](https://aws.amazon.com/)
  - [CodeBuild](https://aws.amazon.com/codebuild/)
  - [S3](https://aws.amazon.com/s3/)
- [React](https://reactjs.org/)
  - [Gatsby](https://www.gatsbyjs.org/)
- Data Sources
  - [Markdown](https://www.markdownguide.org/basic-syntax/)
  - [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
  - [YAML](https://en.wikipedia.org/wiki/YAML)
- Remote Services
  - [Freshdesk API](https://developers.freshdesk.com/api/)
- AWS
  - [CodeBuild](https://aws.amazon.com/codebuild/)
    - [Build Specification Reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
  - [Console](console.aws.amazon.com/)
  - [S3](https://aws.amazon.com/s3/)
