"use client";

import { Typography } from "@cw-game/react-ui";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ExternalLink from "@/shared/ui/ExternalLink";
import type { Contacts } from "@/entities/profile/model";
import { useTranslations } from "next-intl";
import { StyledTelegramIcon, StyledVkIcon } from "./styles";

interface ContactsListProps {
  contacts: Contacts[];
}

export const ContactsList = ({ contacts }: ContactsListProps) => {
  const t = useTranslations("ProfilePage");

  if (contacts.length === 0) return null;

  return (
    <Stack direction="column" gap={1} mb={3}>
      <Typography variant="h6">{t("contacts")}</Typography>
      {contacts.map((contact) => (
        <Box
          key={contact.link}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          {contact.type === "vk" ? (
            <StyledVkIcon />
          ) : contact.type === "telegram" ? (
            <StyledTelegramIcon />
          ) : (
            <></>
          )}
          <ExternalLink href={contact.link}>{contact.link}</ExternalLink>
        </Box>
      ))}
    </Stack>
  );
};
