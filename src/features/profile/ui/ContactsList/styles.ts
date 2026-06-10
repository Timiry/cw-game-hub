import { TelegramIcon, VkIcon } from "@/shared/ui/icons";
import { styled } from "@mui/material/styles";

export const StyledTelegramIcon = styled(TelegramIcon)(({ theme }) => ({
  width: "20px",
  height: "20px",
  fill: theme.palette.hub.text.primary,
}));

export const StyledVkIcon = styled(VkIcon)(({ theme }) => ({
  width: "20px",
  height: "20px",
  fill: theme.palette.hub.text.primary,
}));
