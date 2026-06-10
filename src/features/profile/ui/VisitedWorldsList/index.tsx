"use client";

import { Typography } from "@cw-game/react-ui";
import Stack from "@mui/material/Stack";
import { Link } from "@cw-game/react-ui";
import NextLink from "next/link";
import type { World } from "@/entities/profile/model";
import { useTranslations } from "next-intl";

interface VisitedWorldsListProps {
  worlds: World[];
  hidden?: boolean;
}

export const VisitedWorldsList = ({
  worlds,
  hidden,
}: VisitedWorldsListProps) => {
  const t = useTranslations("ProfilePage");

  if (hidden || worlds.length === 0) return null;

  return (
    <Stack direction="column" gap={1}>
      <Typography variant="h6">{t("worlds")}</Typography>
      {worlds.map((world) => (
        <Link component={NextLink} key={world.url} href={world.url}>
          {world.name}
        </Link>
      ))}
    </Stack>
  );
};
