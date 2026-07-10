"use client";

import Box from "@mui/material/Box";
import DOMPurify from "dompurify";

const SafeHtml = ({ html }: { html: string }) => {
  const sanitized = DOMPurify.sanitize(html);

  return (
    <Box
      sx={{
        "& a": { color: "primary.main" },
        "& img": { maxWidth: "100%", height: "auto" },
        "& details": { margin: "10px" },
        "& summary": { cursor: "pointer" },
      }}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default SafeHtml;
