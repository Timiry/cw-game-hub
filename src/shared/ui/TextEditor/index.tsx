"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { useLocale } from "next-intl";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface TextEditorProps {
  initialData: string;
  onChange: (data: string) => void;
}

export default function TextEditor({ initialData, onChange }: TextEditorProps) {
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
        "link",
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

      link: {
        noFollowCheckbox: false,
        openInNewTabCheckbox: false,
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
          onChange(value);
        }}
      />
    </Box>
  );
}
