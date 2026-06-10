import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

interface BackgroundBannerContainerProps {
  image: string;
}
export const BackgroundBannerContainer = styled(
  Box
)<BackgroundBannerContainerProps>(({ theme, image }) => ({
  width: "100%",
  aspectRatio: "6 / 1",
  position: "relative",
  marginTop: "68px",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  [theme.breakpoints.down("tablet")]: {
    aspectRatio: "4 / 1",
  },
}));

export const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  opacity: 0,
  transition: "opacity 0.25s ease",

  ".hover-parent:hover &": {
    opacity: 1,
  },
  [theme.breakpoints.down("desktop")]: {
    opacity: 1,
  },
}));

export const BackgroundItemCard = styled(Card)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    boxSizing: "border-box",
    border: selected ? "3px solid" : "1px solid",
    borderColor: selected
      ? theme.palette.hub.primary.contrastText
      : theme.palette.divider,
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.palette.hub.primary.contrastText,
      transform: "translateY(-2px)",
      boxShadow: 3,
    },
  })
);
