import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const UploadOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
  pointerEvents: "none",
});
