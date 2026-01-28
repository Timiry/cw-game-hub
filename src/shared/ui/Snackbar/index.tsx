"use client";

import { Button } from "@cw-game/react-ui";
import Alert from "@mui/material/Alert";
import MUISnackbar from "@mui/material/Snackbar";
import { observer } from "mobx-react-lite";
import { useStore } from "@/entities/app-state";

const Snackbar = observer(() => {
  const store = useStore();

  const close = () => store.closeSnackbar();

  return (
    <MUISnackbar
      open={store.snackbar.open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={15000}
      onClose={close}
    >
      <Alert
        onClose={close}
        severity={store.snackbar.severity}
        variant="standard"
        action={
          store.snackbar.onAction && (
            <Button
              color="inherit"
              size="small"
              onClick={store.snackbar.onAction}
            >
              {store.snackbar.action || "Тык"}
            </Button>
          )
        }
        sx={{ width: { mobile: "100%", desktop: "368px" }, mt: "75px" }}
      >
        {store.snackbar.message}
      </Alert>
    </MUISnackbar>
  );
});

export default Snackbar;
