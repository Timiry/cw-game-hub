"use client";

import type { Gift } from "@/entities/profile/model";
import { GiftItem } from "./GiftItem";
import { useState } from "react";
import GiftsListModal from "./GiftListModal";
import { useProfileGiftsList, useUpdateGift } from "../../lib/hooks";
import { useSnackbar } from "@/entities/app-state";
import { useTranslations } from "next-intl";
import { GiftsOverlayContainer, GiftItemWrapper } from "./styles";

interface GiftsOverlayProps {
  gifts: [Gift | null, Gift | null, Gift | null];
  isProfileMine: boolean;
  userId: number;
}

const PAGE_SIZE = 5;

export const GiftsOverlay = ({
  gifts,
  isProfileMine,
  userId,
}: GiftsOverlayProps) => {
  const [first, second, third] = gifts;
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [openSnackbar] = useSnackbar();

  const t = useTranslations("ProfilePage");

  const { data: giftsData } = useProfileGiftsList(
    isProfileMine,
    userId,
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
    <GiftsOverlayContainer>
      {/* Первый подарок (слева, большой) */}
      {first && (
        <GiftItemWrapper $position="left">
          <GiftItem gift={first} handleClick={handleGiftClick} />
        </GiftItemWrapper>
      )}

      {/* Второй подарок (справа, большой) */}
      {second && (
        <GiftItemWrapper $position="right">
          <GiftItem gift={second} handleClick={handleGiftClick} />
        </GiftItemWrapper>
      )}

      {/* Третий подарок (по центру, маленький, чуть левее) */}
      {third && (
        <GiftItemWrapper $position="center">
          <GiftItem gift={third} handleClick={handleGiftClick} />
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
  );
};
