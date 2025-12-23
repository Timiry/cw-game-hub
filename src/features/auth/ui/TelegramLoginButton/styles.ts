import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const StyledLoader = styled(CircularProgress)({
  "& svg circle": { stroke: "white" },
});
