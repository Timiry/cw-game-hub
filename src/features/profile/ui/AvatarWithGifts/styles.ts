import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const GiftsOverlayContainer = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40%",
  pointerEvents: "none",
});

export const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 80,
  height: 80,
  marginTop: "-40px",

  [theme.breakpoints.up("tablet")]: {
    width: 120,
    height: 120,
    marginTop: "-60px",
  },
  [theme.breakpoints.up("desktop")]: {
    width: 256,
    height: 256,
    marginTop: "-130px",
  },
}));

interface GiftItemWrapperProps {
  $position: "left" | "right" | "center";
}

export const GiftItemWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$position",
})<GiftItemWrapperProps>(({ $position }) => {
  const positionStyles = {
    left: {
      left: "-15%",
    },
    right: {
      right: "-10%",
    },
    center: {
      left: "25%",
    },
  };

  return {
    position: "absolute",
    bottom: "-15%",
    width: $position === "center" ? "25%" : "30%",
    height: "auto",
    ...positionStyles[$position],
  };
});

export const GiftListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  border: "1px solid",
  borderColor: theme.palette.divider,
}));
