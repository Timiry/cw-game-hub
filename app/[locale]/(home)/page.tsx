"use client"

// import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useSnackbar, useStore } from "@/entities/app-state";
import { Box, Button, Grid, Input, Typography } from "@mui/material";
import MUISnackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { observer } from "mobx-react-lite";

// export const metadata: Metadata = {
//   title: "Список миров",
// }

const Home = observer(() => {
  const t = useTranslations("ServerListPage");
  const store = useStore();
  const snackbarOptions = useSnackbar();
  const [value, setValue] = useState("");

  return (
    <>
      {!store || !snackbarOptions ? <Box>Загрузка...</Box> : 
      <Box>
        <MUISnackbar
          open={store.appState.snackbar.open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={15000}
          onClose={() => snackbarOptions[1]()}
        >
          <Typography>{store.appState.snackbar.message}</Typography>
        </MUISnackbar>
        <Box style={{display: "flex", justifyContent: "space-between"}}>
          <Link href={"/register"}>{t("registerLink")}</Link>
          <Link href={"/login"}>{t("loginLink")}</Link>
          <Link href={"/confirm-email"}>{t("confirmEmailLink")}</Link>
        </Box>
        <Typography variant="h6">Миры</Typography>
        <Grid container direction="column" rowSpacing="8px" pt="16px">
          {store.appState.localServers.map((address) => (
            <Grid key={address}>
              <Typography variant="h6">{address}</Typography>
            </Grid>
          ))}
        </Grid>
        <Input
          name="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://cw-game.ru"
          size="small"
          fullWidth
        />
        <Button 
          onClick={() => { 
            store.appState.addLocalServer(value);
            snackbarOptions[0]({message: "Добавлен новый мир"})
          }}
        >
          Добавить мир
        </Button>  
      </Box>}
      
    </>
  );
});

export default Home;
