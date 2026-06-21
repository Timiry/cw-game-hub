import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 80,
  height: 80,

  [theme.breakpoints.up("tablet")]: {
    width: 120,
    height: 120,
  },
  [theme.breakpoints.up("desktop")]: {
    width: 256,
    minWidth: 256,
    height: 256,
  },
}));
