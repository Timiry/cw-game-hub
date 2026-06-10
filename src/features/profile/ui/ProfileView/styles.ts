import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const Quote = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  borderLeft: "3px solid",
  borderColor: theme.palette.text.secondary,

  [theme.breakpoints.up("desktop")]: {
    fontSize: "1.75rem",
    borderLeft: "4px solid",
    paddingLeft: theme.spacing(3),
  },
}));
