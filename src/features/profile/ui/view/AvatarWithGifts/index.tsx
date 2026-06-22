"use client";

import type { UserProfile } from "@/entities/profile/model";
import Avatar from "@mui/material/Avatar";
import { GiftItem } from "../../gifts/GiftItem";
import GiftsListModal from "./GiftListModal";
import { useState } from "react";
import { useProfileGiftsList, useUpdateGift } from "../../../lib/hooks";
import { useSnackbar } from "@/entities/app-state";
import { useTranslations } from "next-intl";
import { GiftTooltip } from "../../gifts/GiftTooltip";
import { GiftItemWrapper, GiftsOverlayContainer } from "../../gifts/styles";
import { AvatarContainer } from "../../avatar/styles";

interface AvatarWithGiftsProps {
  profile: UserProfile;
  isProfileMine: boolean;
}

const PAGE_SIZE = 5;

export const AvatarWithGifts = ({
  profile,
  isProfileMine,
}: AvatarWithGiftsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [openSnackbar] = useSnackbar();

  const t = useTranslations("ProfilePage");

  const { data: giftsData } = useProfileGiftsList(
    isProfileMine,
    profile.id,
    PAGE_SIZE,
    page,
    modalOpen
  );

  const giftsList = giftsData?.content || [];
  const totalPages = giftsData?.totalPages || 0;

  const updateGiftMutation = useUpdateGift();
  const handleUpdateGift = (giftId: number, hidden: boolean) => {
    updateGiftMutation.mutate(
      { giftId, hidden },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("giftUpdatedSuccess"),
            severity: "success",
          });
        },
        onError: (err) => {
          openSnackbar({
            message: t("giftUpdatedError") + " " + (err as Error)?.toString?.(),
            severity: "error",
          });
        },
      }
    );
  };

  const handleGiftClick = () => {
    setPage(0);
    setModalOpen(true);
  };

  return (
    <AvatarContainer
      mt={{ mobile: "-40px", tablet: "-60px", desktop: "-130px" }}
    >
      <Avatar
        src={profile.photo || "/avatar-fallback.svg"}
        alt={profile.name}
        title=""
        variant="rounded"
        sx={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      <GiftsOverlayContainer>
        {profile.primaryGift && (
          <GiftItemWrapper $position="left">
            <GiftTooltip gift={profile.primaryGift}>
              <GiftItem
                gift={profile.primaryGift}
                handleClick={handleGiftClick}
              />
            </GiftTooltip>
          </GiftItemWrapper>
        )}

        {profile.secondaryGift && (
          <GiftItemWrapper $position="right">
            <GiftTooltip gift={profile.secondaryGift}>
              <GiftItem
                gift={profile.secondaryGift}
                handleClick={handleGiftClick}
              />
            </GiftTooltip>
          </GiftItemWrapper>
        )}

        {profile.tertiaryGift && (
          <GiftItemWrapper $position="center">
            <GiftTooltip gift={profile.tertiaryGift}>
              <GiftItem
                gift={profile.tertiaryGift}
                handleClick={handleGiftClick}
              />
            </GiftTooltip>
          </GiftItemWrapper>
        )}

        <GiftsListModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          gifts={giftsList}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isProfileMine={isProfileMine}
          handleUpdateGift={handleUpdateGift}
        />
      </GiftsOverlayContainer>
    </AvatarContainer>
  );
};
