import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
export const GiftListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  border: "1px solid",
  borderColor: theme.palette.divider,
}));
