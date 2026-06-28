"use client";

import ExternalLink from "@/shared/ui/ExternalLink";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import {
  StyledDiscordIcon,
  StyledNodeJsIcon,
  StyledPixiJsIcon,
  StyledSpringIcon,
  StyledTelegramIcon,
  StyledTiktokIcon,
  StyledVkIcon,
} from "./styles";
import { Link } from "@cw-game/react-ui";
import routes from "@/shared/config/routes";
import NextLink from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <Box width="80%" maxWidth="1200px" m="0 auto 30px">
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        mb={3}
      >
        <Stack
          direction={{ mobile: "column", desktop: "row" }}
          gap={3}
          alignItems={"center"}
        >
          <Typography
            variant="subtitle1"
            textTransform={"uppercase"}
            mt={{ mobile: 3, desktop: 0 }}
          >
            {t("findUs")}
          </Typography>
          <ExternalLink href="https://t.me/cats_world_game">
            <StyledTelegramIcon />
          </ExternalLink>
          <ExternalLink href="https://vk.com/cats_world_game">
            <StyledVkIcon />
          </ExternalLink>
          <ExternalLink href="https://discord.gg/KN7PxP4VNX">
            <StyledDiscordIcon />
          </ExternalLink>
          <ExternalLink href="https://www.tiktok.com/@cw_game_official">
            <StyledTiktokIcon />
          </ExternalLink>
        </Stack>

        <Stack
          direction={{ mobile: "column", desktop: "row" }}
          alignItems={"center"}
        >
          <Typography
            variant="subtitle1"
            textTransform={"uppercase"}
            pr={1}
            mt={{ mobile: 3, desktop: 0 }}
          >
            {t("poweredBy")}
          </Typography>
          <ExternalLink href="https://pixijs.com/">
            <StyledPixiJsIcon />
          </ExternalLink>
          <ExternalLink href="https://nodejs.org/">
            <StyledNodeJsIcon />
          </ExternalLink>
          <ExternalLink href="https://spring.io/">
            <StyledSpringIcon />
          </ExternalLink>
        </Stack>
      </Box>

      <Stack
        direction={{ mobile: "column", tablet: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={2}
        mb={2}
      >
        <Link component={NextLink} href={routes.legalTerms}>
          {t("terms")}
        </Link>
        <Link component={NextLink} href={routes.legalPrivacy}>
          {t("privacy")}
        </Link>
      </Stack>

      <Typography textAlign={"center"}>
        @ {new Date().getFullYear()} {t("footerText")}
      </Typography>
    </Box>
  );
}
