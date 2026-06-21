"use client";

import type { Gift } from "@/entities/profile/model";
import Box from "@mui/material/Box";
import Image from "next/image";

interface GiftItemProps {
  gift: Gift | null;
  handleClick: () => void;
}

export const GiftItem = ({ gift, handleClick }: GiftItemProps) => {
  return (
    <Box
      position="relative"
      width="100%"
      sx={{ aspectRatio: "1/1" }}
      onClick={handleClick}
    >
      {gift && (
        <Image
          src={gift.imageUrl}
          alt="gift"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
};
