const hashPattern = new RegExp(/^#(.+)$/);
const externalUrlPattern = new RegExp(/^https?:\/\//);
const govUrlPattern = new RegExp(/^https?:\/\/.*\.gov\//);

export const getLinkType = (to) => {
  const isGovLink = govUrlPattern.exec(to);
  if (isGovLink) {
    return "isGovLink";
  }

  const isNonGovExternalLink = externalUrlPattern.exec(to);
  if (isNonGovExternalLink) {
    return "isNonGovExternalLink";
  }

  const hashLink = hashPattern.exec(to);
  if (hashLink) {
    return "hashLink";
  }

  return "isInternalLink"; // Return a default value for internal links
};
