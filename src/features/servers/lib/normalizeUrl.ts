export const normalizeUrl = (url: string): string => {
  let normalized = url.trim();

  if (!normalized) return "";

  normalized = normalized.replace(/[./]+$/, "");

  if (normalized.startsWith("http://")) {
    normalized = "https://" + normalized.slice(7);
  } else if (!normalized.startsWith("https://")) {
    normalized = "https://" + normalized;
  }

  return normalized;
};
