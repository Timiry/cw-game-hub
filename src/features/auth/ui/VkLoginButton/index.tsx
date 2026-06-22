import { VkIcon } from "@/shared/ui/icons";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

export const VkLoginButton = () => {
  const t = useTranslations("LoginPage");
  return (
    <Box
      borderRadius="8px"
      height="40px"
      width="204px"
      boxShadow={(theme) => theme.shadows[3]}
      bgcolor="#0077ff"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: "pointer",
      }}
      onClick={() => {
        window.open(
          "https://accounts.cw-game.ru/v1/login/vk",
          "_blank",
          "scrollbars=yes,resizable=yes"
        );
      }}
    >
      <VkIcon width="20px" height="20px" fill="#ffffff" />
      <Typography
        pl={1}
        fontFamily="sans-serif"
        fontSize="13px"
        letterSpacing="0px"
      >
        {t("vkLogin")}
      </Typography>
    </Box>
  );
};
