import { styled } from "@mui/material/styles";

export const StyledHeader = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 12px",
  [theme.breakpoints.up("tablet")]: {
    padding: "12px 24px",
  },
  [theme.breakpoints.up("desktop")]: {
    padding: "12px 70px",
  },
  backgroundColor: theme.palette.hub.background.default,
  borderBottom: `1px solid`,
  borderColor: theme.palette.divider,
  zIndex: theme.zIndex.appBar,
}));
