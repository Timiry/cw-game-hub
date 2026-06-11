"use client";

import { GiftsOverlay } from "./GiftsOverlay";
import type { Gift, UserProfile } from "@/entities/profile/model";
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
  const gifts: [Gift | null, Gift | null, Gift | null] = [
    profile.primaryGift,
    profile.secondaryGift,
    profile.tertiaryGift,
  ];

  return (
    <AvatarContainer>
      <Image
        src={profile.photo || "/avatar-fallback.svg"}
        alt={"avatar"}
        fill
        style={{
          objectFit: "contain",
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
