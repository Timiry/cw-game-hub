"use client";

import Avatar from "@mui/material/Avatar";
import { GiftsOverlay } from "./GiftsOverlay";
import type { UserProfile } from "@/entities/profile/model";
import Image from "next/image";
import { AvatarContainer } from "./styles";

interface AvatarWithGiftsProps {
  profile: UserProfile;
  isProfileMine: boolean;
}

export const AvatarWithGifts = ({
  profile,
  isProfileMine,
}: AvatarWithGiftsProps) => {
  const gifts: [
    typeof profile.primaryGift,
    typeof profile.secondaryGift,
    typeof profile.tertiaryGift,
  ] = [profile.primaryGift, profile.secondaryGift, profile.tertiaryGift];

  return (
    <AvatarContainer>
      <Avatar
        src={profile.photo}
        alt={profile.name}
        variant="rounded"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image src="/avatar-fallback.svg" alt="avatar" fill />
      </Avatar>

      <GiftsOverlay
        gifts={gifts}
        isProfileMine={isProfileMine}
        userId={profile.id}
      />
    </AvatarContainer>
  );
};
