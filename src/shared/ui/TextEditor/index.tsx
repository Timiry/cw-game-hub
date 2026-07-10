"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import type { Jodit } from "jodit";

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
  const t = useTranslations("TextEditor");

  const config = useMemo(
    () => ({
      readonly: false,
      controls: {
        spoiler: {
          name: "spoiler",
          icon: "chevron",
          tooltip: t("spoilerTooltip"),
          exec: function (editor: Jodit) {
            const selectedText = editor.s?.html || t("detailsText");
            const html = `<details style="margin: 10px" open><summary style="cursor: pointer"><div style="display: inline; margin: 0; padding: 0">${t("summaryText")}</div></summary><p>${selectedText}</p></details>`;
            editor.s.insertHTML(html);
          },
        },
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "brush",
        "|",
        "spoiler",
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
    [locale, t]
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
