import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const GiftsOverlayContainer = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40%",
  pointerEvents: "none",
});

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
    bottom: "-25%",
    width: $position === "center" ? "25%" : "30%",
    height: "auto",
    cursor: "pointer",
    pointerEvents: "auto",
    ...positionStyles[$position],
  };
});
