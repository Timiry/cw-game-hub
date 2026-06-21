"use client";

import routes from "@/shared/config/routes";
import { useRouter } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { Typography, Button } from "@cw-game/react-ui";

const SettingsButton = () => {
  const t = useTranslations("ProfilePage");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));
  const router = useRouter();

  return (
    <Button onClick={() => router.push(routes.myProfileSettings)}>
      <SettingsIcon />
      {!isMobile && <Typography ml={1}>{t("settings")}</Typography>}
    </Button>
  );
};

export default SettingsButton;
