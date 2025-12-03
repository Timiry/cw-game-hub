"use client"

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";

const FailedToFetchServers = () => {
  const t = useTranslations("ServerListPage");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="96px"
      textAlign="center"
    >
        <Typography variant="body1" color="error.main">
          {t("failedToFetch")}
        </Typography>
    </Box>
  );
};

export default FailedToFetchServers;
