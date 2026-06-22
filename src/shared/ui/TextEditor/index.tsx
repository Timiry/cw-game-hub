"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { useLocale } from "next-intl";
import { cleanEmptyHtml } from "@/shared/lib/html/cleamEmptyHtml";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface EditLessonFormProps {
  initialData: string;
  onChange: (data: string) => void;
}

export default function TextEditor({
  initialData,
  onChange,
}: EditLessonFormProps) {
  const editor = useRef(null);
  const locale = useLocale();

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "brush",
        "|",
        "ul",
        "ol",
        "|",
        "paragraph",
        "|",
        "table",
        "symbols",
        "image",
        "|",
        "indent",
        "outdent",
        "align",
        "undo",
        "redo",
      ],
      minHeight: 400,
      language: locale,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      defaultFontSize: "14px",
      style: {
        fontWeight: "400",
        overflowX: "auto",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        whiteSpace: "normal",
        backgroundColor: "#161D21",
      },
    }),
    [locale]
  );

  return (
    <Box>
      <JoditEditor
        ref={editor}
        value={initialData}
        config={config}
        onBlur={(value) => {
          const cleanedValue = cleanEmptyHtml(value);
          onChange(cleanedValue);
        }}
      />
    </Box>
  );
}
