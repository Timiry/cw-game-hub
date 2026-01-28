import { styled } from "@mui/material/styles";

export const StyledHeader = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  [theme.breakpoints.up("desktop")]: {
    padding: "12px 70px",
  },
  borderBottom: `1px solid ${theme.palette.hub.primary.dark}`,
  zIndex: theme.zIndex.appBar,
}));
