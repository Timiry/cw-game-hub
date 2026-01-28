import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ServerListViewport = styled(Box)(() => ({
  maxHeight: "calc(100vh - 300px)",
  overflowY: "auto",
  overflowX: "hidden",
  marginTop: "16px",
}));
