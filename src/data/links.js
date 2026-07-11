import { neetcodeUrl } from "./dsaLinks";
import { resourceLinks } from "./resourceLinks";

export const getRevisionLink = (sectionId, problemName) => {
  if (sectionId === "dsa") return neetcodeUrl(problemName);
  return resourceLinks[problemName] ?? null;
};
