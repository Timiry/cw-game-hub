import { stylesToColorSvg } from "@cw-game/react-ui";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { BlockIcon, DisconnectIcon, RunningCatIcon } from "@/shared/ui/icons";

export const Container = styled(Paper)(({ theme }) => ({
  padding: "12px",
  borderRadius: "16px",
  backgroundColor: theme.palette.hub.primary.dark,
  position: "relative",
}));

export const NetworkLoaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  "& rect": {
    fill: theme.palette.success.main,
  },
}));

export const StyledDisconnectIcon = styled(DisconnectIcon)(({ theme }) => ({
  ...stylesToColorSvg(theme.palette.error.main),
}));

export const StyledRunningCatIcon = styled(RunningCatIcon)(({ theme }) => ({
  ...stylesToColorSvg(theme.palette.success.main),
  width: "20px",
  height: "20px",
  marginRight: "4px",
}));

export const StyledBlockIcon = styled(BlockIcon)(({ theme }) => ({
  width: "24px",
  height: "24px",
  fill: theme.palette.error.main,
}));
