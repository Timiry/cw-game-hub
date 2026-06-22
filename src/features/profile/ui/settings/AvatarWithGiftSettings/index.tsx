"use client";

import { useRef, useState } from "react";
import type { Gift, UserProfile } from "@/entities/profile/model";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/entities/app-state";
import { AvatarContainer } from "@/features/profile/ui/avatar/styles";
import {
  GiftItemWrapper,
  GiftsOverlayContainer,
} from "@/features/profile/ui/gifts/styles";
import { GiftItem } from "@/features/profile/ui/gifts/GiftItem";
import { UploadOverlay } from "./styles";
import { useUploadProfilePhoto } from "@/features/profile/lib/hooks";

export type GiftSlots = "primaryGift" | "secondaryGift" | "tertiaryGift";

interface AvatarWithGiftSettingsProps {
  profile: UserProfile;
  selectedGifts: {
    primaryGift: Gift | null;
    secondaryGift: Gift | null;
    tertiaryGift: Gift | null;
  };
  onSlotClick: (slot: GiftSlots) => void;
}

export const AvatarWithGiftSettings = ({
  profile,
  selectedGifts,
  onSlotClick,
}: AvatarWithGiftSettingsProps) => {
  const t = useTranslations("ProfileSettingsPage");
  const [openSnackbar] = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const uploadProfilePhotoMutation = useUploadProfilePhoto();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      openSnackbar({
        message: t("photoUploadError") + ": " + t("invalidFileType"),
        severity: "error",
      });
      return;
    }

    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      openSnackbar({
        message: t("photoUploadError") + ": " + t("fileTooLarge"),
        severity: "error",
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadProfilePhotoMutation.mutateAsync(file);
      openSnackbar({
        message: t("photoUploadSuccess"),
        severity: "success",
      });
    } catch (err) {
      openSnackbar({
        message: t("photoUploadError") + " " + (err as Error)?.toString?.(),
        severity: "error",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAvatarClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <AvatarContainer m={{ mobile: "0 auto", desktop: "0 30px 0 70px" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={isUploading}
      />

      <Box
        onClick={handleAvatarClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          width: "100%",
          height: "100%",
          cursor: isUploading ? "wait" : "pointer",
        }}
      >
        <Avatar
          src={profile?.photo || "/avatar-fallback.svg"}
          alt={profile?.name}
          variant="rounded"
          sx={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </Box>

      <UploadOverlay
        sx={{
          opacity: isHovering ? 1 : 0,
        }}
      >
        {isUploading ? (
          <CircularProgress />
        ) : (
          <Box textAlign="center" px={1}>
            {t("upload")}
          </Box>
        )}
      </UploadOverlay>

      <GiftsOverlayContainer>
        <GiftItemWrapper $position="left" border="dashed 2px">
          <GiftItem
            gift={selectedGifts.primaryGift}
            handleClick={() => onSlotClick("primaryGift")}
          />
        </GiftItemWrapper>

        <GiftItemWrapper $position="right" border="dashed 2px">
          <GiftItem
            gift={selectedGifts.secondaryGift}
            handleClick={() => onSlotClick("secondaryGift")}
          />
        </GiftItemWrapper>

        <GiftItemWrapper $position="center" border="dashed 2px">
          <GiftItem
            gift={selectedGifts.tertiaryGift}
            handleClick={() => onSlotClick("tertiaryGift")}
          />
        </GiftItemWrapper>
      </GiftsOverlayContainer>
    </AvatarContainer>
  );
};
