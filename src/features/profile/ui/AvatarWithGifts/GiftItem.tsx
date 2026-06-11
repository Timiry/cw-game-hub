"use client";

import type { Gift } from "@/entities/profile/model";
import Box from "@mui/material/Box";
import Image from "next/image";
import { GiftTooltip } from "./GiftTooltip";

export const GiftItem = ({
  gift,
  handleClick,
}: {
  gift: Gift;
  handleClick: () => void;
}) => {
  return (
    <GiftTooltip gift={gift}>
      <Box
        position="relative"
        width="100%"
        sx={{ aspectRatio: "1/1" }}
        onClick={handleClick}
      >
        <Image
          src={gift.imageUrl}
          alt="gift"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
    </GiftTooltip>
  );
};
