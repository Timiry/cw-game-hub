"use client";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";

interface EmptyServerListProps {
  onLink: () => void;
}

const EmptyServerList = ({ onLink }: EmptyServerListProps) => {
  const t = useTranslations("ServerListPage");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="96px"
      textAlign="center"
    >
      <Box>
        <Typography variant="body1" color="text.secondary">
          {t("noWorldsFound")}
        </Typography>
        <Link onClick={onLink} sx={{ cursor: "pointer" }}>
          <Typography component="span" variant="body1" color="success.main">
            {t("addWorldPrompt")}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyServerList;
