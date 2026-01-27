import { styled, ToggleButtonGroup } from "@mui/material";

export const LangToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  height: 36,
  backgroundColor: "transparent",
  "& .MuiToggleButton-root": {
    width: 60,
    textTransform: "uppercase",
    borderColor: theme.palette.hub.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.hub.background.paper,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.hub.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.hub.primary.dark,
      },
    },
  },
}));
