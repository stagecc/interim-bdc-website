const hashPattern = new RegExp(/^#(.+)$/);
const externalUrlPattern = new RegExp(/^https?:\/\//);

export const getLinkType = (to) => {
  const isExternalLink = externalUrlPattern.exec(to);
  if (isExternalLink) {
    return "isExternalLink";
  }

  const hashLink = hashPattern.exec(to);
  if (hashLink) {
    return "hashLink";
  }

  return "isInternalLink"; // Return a default value for internal links
};
