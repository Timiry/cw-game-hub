export const cleanEmptyHtml = (html: string): string => {
  if (!html) return "";

  let cleaned = html;

  for (let i = 0; i < 5; i++) {
    cleaned = cleaned.replace(/<([a-z][a-z0-9]*)\b[^>]*>\s*<\/\1>/gi, "");
  }

  cleaned = cleaned
    .replace(
      /<([a-z][a-z0-9]*)\b[^>]*>\s*(<br\s*\/?>|&nbsp;|\s)*\s*<\/\1>/gi,
      ""
    )
    .replace(/<br\s*\/?>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .trim();

  return cleaned;
};
