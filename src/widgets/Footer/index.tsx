"use client";

import ExternalLink from "@/shared/ui/ExternalLink";
import { Divider } from "@mui/material";
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

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <Box width="80%" m="0 auto 30px">
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        mb={3}
      >
        <Stack
          direction={"row"}
          spacing={3}
          alignItems={"center"}
          height={"100px"}
          flexWrap={"wrap"}
        >
          <Typography variant="subtitle1" textTransform={"uppercase"}>
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

        <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
          <Typography variant="subtitle1" textTransform={"uppercase"} pr={1}>
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

      <Typography textAlign={"center"}>
        @ {new Date().getFullYear()} {t("footerText")}
      </Typography>
    </Box>
  );
}
