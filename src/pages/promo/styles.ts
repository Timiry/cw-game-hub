import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CoveredSection = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  position: "relative",
  color: theme.palette.hub.background.default,

  background: `linear-gradient(135deg, #61A8CE 0%, #a6d0df 40%, #55724F 100%)`,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url(/poster.webp)",
    backgroundSize: "cover",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",

    [theme.breakpoints.up("tablet")]: {
      backgroundPosition: "right",
    },
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
