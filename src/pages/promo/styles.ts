import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CoveredSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/poster.webp)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100vh",
  position: "static",
  color: theme.palette.hub.background.default,
  backgroundPosition: "left",
  [theme.breakpoints.up("tablet")]: {
    backgroundPosition: "right",
  },
}));

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  margin: "68px 0 0",
  width: "80%",
  left: "10%",
  [theme.breakpoints.up("desktop")]: {
    width: "40%",
    bottom: "10%",
  },
}));
