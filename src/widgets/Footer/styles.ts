import {
  DiscordIcon,
  NodeJsIcon,
  PixiJsIcon,
  SpringIcon,
  TelegramIcon,
  TiktokIcon,
  VkIcon,
} from "@/shared/ui/icons";
import { styled } from "@mui/material/styles";

export const StyledTelegramIcon = styled(TelegramIcon)(({ theme }) => ({
  width: "30px",
  height: "30px",
  fill: theme.palette.hub.text.primary,
}));

export const StyledVkIcon = styled(VkIcon)(({ theme }) => ({
  width: "30px",
  height: "30px",
  fill: theme.palette.hub.text.primary,
}));

export const StyledDiscordIcon = styled(DiscordIcon)(({ theme }) => ({
  width: "30px",
  height: "30px",
  fill: theme.palette.hub.text.primary,
}));

export const StyledTiktokIcon = styled(TiktokIcon)(({ theme }) => ({
  width: "30px",
  height: "30px",
  fill: theme.palette.hub.text.primary,
}));

export const StyledPixiJsIcon = styled(PixiJsIcon)(() => ({
  width: "70px",
  height: "50px",
}));

export const StyledNodeJsIcon = styled(NodeJsIcon)(() => ({
  width: "90px",
  height: "100px",
}));

export const StyledSpringIcon = styled(SpringIcon)(() => ({
  width: "100px",
  height: "100px",
}));
