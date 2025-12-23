"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Link, Loader, Typography } from "@cw-game/react-ui";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTranslations } from "next-intl";

import { useStore } from "@/entities/app-state";
import routes from "@/shared/config/routes";
import { useUserProfile } from "@/entities/profile";
import useServerList from "@/features/servers/lib/hooks/useServerList";
import CardLayout from "@/shared/ui/CardLayout";
import { AddIcon } from "@/shared/ui/icons";

import FailedToFetchServers from "@/features/servers/ui/FailedToFetchServers";
import ServerListItem from "@/features/servers/ui/ServerListItem";
import EmptyServerList from "@/features/servers/ui/EmptyServerList";
import AddLocalServer from "@/features/servers/ui/AddLocalServer";

const ServerListPage = observer(() => {
  const store = useStore();
  const t = useTranslations("ServerListPage");

  const {
    data: user,
    error: userError,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useUserProfile();
  const {
    data: servers,
    isLoading: isLoadingServers,
    isError: isServersError,
  } = useServerList();
  const [isOpenAddLocalServer, setOpenAddLocalServer] = useState(false);

  const isServerListEmpty =
    servers?.length === 0 && store.localServers.length === 0;

  const emailNotConfirmed = user?.data !== undefined && !user.data.confirmed;

  const openAddLocalServer = () => {
    setOpenAddLocalServer(true);
  };

  if (isLoadingServers || isUserProfileLoading)
    return (
      <CardLayout>
        <Loader />
      </CardLayout>
    );

  return (
    <CardLayout>
      {user?.data?.id && (
        <Typography
          variant="caption"
          position="absolute"
          bottom="-32px"
          right="0px"
          color="text.secondary"
        >
          {t("externalId", { id: user.data.id })}
        </Typography>
      )}

      {isUserProfileError && (
        <Stack spacing="12px" mb="12px">
          {(userError.status === 401 && (
            <Typography variant="body1">
              {t("notAuthorized")}{" "}
              <Link href={routes.login}>
                <Typography component="span" variant="body1">
                  {t("loginLink")}
                </Typography>
              </Link>
            </Typography>
          )) || (
            <Typography variant="body1" color="error.main">
              {t("genericError")}
            </Typography>
          )}
          <Divider />
        </Stack>
      )}
      {emailNotConfirmed && (
        <Stack spacing="12px" mb="12px">
          <Typography variant="body1">
            {t("emailNotConfirmed")}{" "}
            <Link href={routes.confirmEmail}>
              <Typography component="span" variant="body1" color="success.main">
                {t("confirmEmailLink")}
              </Typography>
            </Link>
          </Typography>
          <Divider />
        </Stack>
      )}
      <Grid container justifyContent="space-between">
        <Grid>
          <Typography variant="h6">{t("worldsTitle")}</Typography>
        </Grid>
        <Grid display="flex" alignContent="center">
          <IconButton
            size="small"
            onClick={() => setOpenAddLocalServer((prev) => !prev)}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <AddLocalServer
        open={isOpenAddLocalServer}
        onClose={() => setOpenAddLocalServer(false)}
      />
      {isServersError && <FailedToFetchServers />}
      {isServerListEmpty && <EmptyServerList onLink={openAddLocalServer} />}
      <Grid container direction="column" rowSpacing="8px" pt="16px">
        {store.localServers.map((address) => (
          <Grid key={address}>
            <ServerListItem
              origin={address}
              forbidden={user === undefined || emailNotConfirmed}
              onDelete={() => store.deleteLocalServer(address)}
            />
          </Grid>
        ))}
        {servers?.map((server) => (
          <Grid key={server.id}>
            <ServerListItem
              origin={server.address}
              name={server.name}
              description={server.description}
              forbidden={user === undefined || emailNotConfirmed}
            />
          </Grid>
        ))}
      </Grid>
    </CardLayout>
  );
});

export default ServerListPage;
