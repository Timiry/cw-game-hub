"use client"

import { Button, Typography } from "@cw-game/react-ui";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";

import useServerInfo from "../../lib/hooks/useServerInfo";
import { NetworkLoader } from "../icons";
import {
  Container,
  NetworkLoaderContainer,
  StyledBlockIcon,
  StyledDisconnectIcon,
  StyledRunningCatIcon,
} from "./styles";
import engineEndpoints from "@/shared/config/endpoints/engine";

type ServerListItemProps = {
  origin: string;
  forbidden: boolean;
  name?: string;
  description?: string;
  onDelete?: () => void;
};

const ServerListItem = ({
  origin,
  forbidden,
  name,
  description,
  onDelete,
}: ServerListItemProps) => {
  const { data: info, isLoading, isError } = useServerInfo(origin);

  const accessDenied = info?.forbidden || forbidden;

  const t = useTranslations("ServerListPage");

  const navigateToServer = async () => {
    if (accessDenied) return;
    location.assign(origin + engineEndpoints.login);
  };

  if (isLoading)
    return (
      <Container>
        <Grid container justifyContent="space-between">
          <Grid>
            <Typography variant="body1">{name || origin}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Grid>
          <Grid>
            <NetworkLoaderContainer>
              <NetworkLoader />
            </NetworkLoaderContainer>
            {onDelete && (
              <Button variant="text" size="small" onClick={onDelete}>
                {t("deleteButton")}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    );

  if (isError || !info)
    return (
      <Container>
        <Grid container justifyContent="space-between">
          <Grid>
            <Typography variant="body1">{name || origin}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Grid>
          <Grid>
            <Box textAlign="end">
              <StyledDisconnectIcon />
            </Box>
            {onDelete && (
              <Button variant="text" size="small" onClick={onDelete}>
                {t("deleteButton")}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <Container
      sx={{
        cursor: accessDenied ? "auto" : "pointer",
      }}
      onClick={navigateToServer}
    >
      <Stack direction="row" position="absolute" top="12px" right="12px">
        {accessDenied && (
          <Box title={t("accessDenied")}>
            <StyledBlockIcon />
          </Box>
        )}
      </Stack>
      <Grid container justifyContent="space-between">
        <Grid>
          <Grid container direction="column">
            <Grid>
              <Typography variant="body1">{info.name}</Typography>
            </Grid>
            <Grid>
              <Typography variant="caption">{info.description}</Typography>
            </Grid>
            <Grid title={t("onlinePlayers")}>
              <StyledRunningCatIcon />
              <Typography variant="caption" color="success.main">
                {info.online}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid alignSelf="flex-end" onClick={(e) => e.stopPropagation()}>
          {onDelete && (
            <Button variant="text" size="small" onClick={onDelete}>
              {t("deleteButton")}
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServerListItem;
