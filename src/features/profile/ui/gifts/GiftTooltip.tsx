"use client";

import { Tooltip, Typography, Link, Paper } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import NextLink from "next/link";
import Image from "next/image";
import type { Gift } from "@/entities/profile/model";
import { useTranslations } from "next-intl";

interface GiftTooltipProps {
  gift: Gift;
  children: React.ReactNode;
}

export const GiftTooltip = ({ gift, children }: GiftTooltipProps) => {
  const t = useTranslations("ProfilePage");

  return (
    <Tooltip
      title={
        <Paper
          elevation={5}
          component={Box}
          padding={3}
          maxWidth="300px"
          textAlign="center"
          sx={{ borderRadius: 1 }}
        >
          <Box
            position="relative"
            width="100px"
            height="100px"
            mx="auto"
            mb={1}
          >
            <Image
              src={gift.imageUrl}
              alt={gift.text}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          {gift.text && <Typography mb={1}>{gift.text}</Typography>}

          <Link
            component={NextLink}
            href={`/profile/${gift.senderId}`}
            variant="body1"
          >
            {gift.senderName || t("nameFallback")}
          </Link>
        </Paper>
      }
      placement="top"
      arrow
      slotProps={{
        tooltip: {
          sx: {
            padding: 0,
            "& .MuiTooltip-arrow": {
              color: "background.paper",
            },
          },
        },
      }}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};
