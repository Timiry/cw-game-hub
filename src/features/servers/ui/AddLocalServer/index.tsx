"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button, Input, Typography } from "@cw-game/react-ui";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useStore } from "@/entities/app-state";
import { Container } from "./styles";
import { useTranslations } from "next-intl";

interface AddLocalServerProps {
  open: boolean;
  onClose: () => void;
}

const AddLocalServer = ({ open, onClose }: AddLocalServerProps) => {
  const store = useStore();
  const [value, setValue] = useState("");
  const t = useTranslations("ServerListPage");

  const addServer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store?.appState.addLocalServer(value);
    onClose();
  };

  return (
    <Collapse in={open}>
      <Container>
        <form onSubmit={addServer}>
          <Typography variant="body1">{t("addWorldManually")}</Typography>
          <Typography variant="caption">{t("worldAddress")}</Typography>
          <Grid container columnSpacing="8px">
            <Grid flexGrow={1} alignItems="center">
              <Input
                name="url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="https://cw-game.ru"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid display="flex">
              <Button variant="contained" size="small" type="submit">
                {t("addButton")}
              </Button>
              <Box width="4px" />
              <Button variant="text" size="small" onClick={onClose}>
                {t("cancelButton")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Collapse>
  );
};

export default AddLocalServer;
