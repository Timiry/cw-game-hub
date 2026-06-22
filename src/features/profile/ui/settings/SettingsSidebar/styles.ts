import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

export const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: 240,
    top: 65,
    height: `calc(100vh - 65px)`,
    borderRadius: "0",
  },
}));
