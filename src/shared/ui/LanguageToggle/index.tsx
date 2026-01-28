"use client";

import ToggleButton from "@mui/material/ToggleButton";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/shared/i18n/navigation";
import { LangToggleButtonGroup } from "./styles";
import { useCallback } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newLocale: string) => {
      if (newLocale) {
        router.replace(pathname, { locale: newLocale });
        router.refresh();
      }
    },
    [router, pathname]
  );

  return (
    <LangToggleButtonGroup value={locale} exclusive onChange={handleChange}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ru">RU</ToggleButton>
    </LangToggleButtonGroup>
  );
}
