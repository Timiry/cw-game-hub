"use client";

import { GiftsOverlay } from "./GiftsOverlay";
import type { Gift, UserProfile } from "@/entities/profile/model";
// import Image from "next/image";
import { AvatarContainer } from "./styles";
import Avatar from "@mui/material/Avatar";

interface AvatarWithGiftsProps {
  profile: UserProfile;
  isProfileMine: boolean;
}

export const AvatarWithGifts = ({
  profile,
  isProfileMine,
}: AvatarWithGiftsProps) => {
  const gifts: [Gift | null, Gift | null, Gift | null] = [
    profile.primaryGift,
    profile.secondaryGift,
    profile.tertiaryGift,
  ];

  return (
    <AvatarContainer>
      <Avatar
        src={profile.photo || "/avatar-fallback.svg"}
        alt={profile.name}
        variant="rounded"
        sx={{
          width: "100%",
          height: "100%",
        }}
      />

      <GiftsOverlay
        gifts={gifts}
        isProfileMine={isProfileMine}
        userId={profile.id}
      />
    </AvatarContainer>
  );
};
