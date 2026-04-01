import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CoveredSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/poster.webp)",
  backgroundSize: "cover",
  backgroundPosition: "right",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100vh",
  position: "static",
  color: theme.palette.hub.background.default,
}));
