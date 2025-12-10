"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/shared/i18n/navigation";
import { Box, FormControl, MenuItem, Select } from "@mui/material";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  return (
    <Box width={{ mobile: "90%", desktop: "480px" }} m="0 auto 20px" pt="160px" position="relative">
      <FormControl fullWidth>
        <Select
          id="lang"
          defaultValue="ru"
          value={currentLocale}
          onChange={e => switchLocale(e.target.value)}
        >
          <MenuItem value={"ru"}>Русский</MenuItem>
          <MenuItem value={"en"}>English</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
