"use client";

import { useState } from "react";
import { EditProfileForm } from "@/features/profile/ui/settings/EditProfileForm";
import { useCurrentUserGifts } from "@/features/profile/lib/hooks";
import type {
  Gift,
  UpdateUserProfileRequest,
  UserProfile,
} from "@/entities/profile/model";
import Box from "@mui/material/Box";
import GiftsSettingsModal from "@/features/profile/ui/settings/GiftsSettingsModal";
import { AvatarWithGiftSettings } from "../AvatarWithGiftSettings";
import type { GiftSlots } from "../AvatarWithGiftSettings";

const PAGE_SIZE = 4;

interface ProfileSettingsContentProps {
  profile: UserProfile;
  onUpdateProfile: (data: UpdateUserProfileRequest) => void;
}

const ProfileSettingsContent = ({
  profile,
  onUpdateProfile,
}: ProfileSettingsContentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);

  const { data: giftsData } = useCurrentUserGifts(PAGE_SIZE, page, modalOpen);

  const giftsList = giftsData?.content || [];
  const totalPages = giftsData?.totalPages || 0;

  const [currentGiftSlot, setCurrentGiftSlot] =
    useState<GiftSlots>("primaryGift");

  const [selectedGifts, setSelectedGifts] = useState({
    primaryGift: profile?.primaryGift || null,
    secondaryGift: profile?.secondaryGift || null,
    tertiaryGift: profile?.tertiaryGift || null,
  });

  const onSubmit = (data: UpdateUserProfileRequest) => {
    onUpdateProfile({
      ...data,
      primaryGiftId: selectedGifts.primaryGift?.giftId || null,
      secondaryGiftId: selectedGifts.secondaryGift?.giftId || null,
      tertiaryGiftId: selectedGifts.tertiaryGift?.giftId || null,
    });
  };

  const handleSlotClick = (type: GiftSlots) => {
    setCurrentGiftSlot(type);
    setPage(0);
    setModalOpen(true);
  };

  const onSelectGift = (slot: GiftSlots, gift: Gift | null) => {
    setSelectedGifts((prev) => {
      const newGifts = { ...prev };
      if (gift === null) {
        newGifts[slot] = null;
        return newGifts;
      }
      (Object.keys(newGifts) as GiftSlots[]).forEach((key) => {
        if (key !== slot && newGifts[key]?.giftId === gift.giftId) {
          newGifts[key] = null;
        }
      });

      newGifts[slot] = gift;
      return newGifts;
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection={{ mobile: "column", desktop: "row-reverse" }}
      flexGrow={1}
      p={3}
      pt={{ mobile: 0, desktop: 3 }}
    >
      <AvatarWithGiftSettings
        profile={profile}
        selectedGifts={selectedGifts}
        onSlotClick={handleSlotClick}
      />

      <EditProfileForm initialData={profile} onSubmit={onSubmit} />

      <GiftsSettingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        gifts={giftsList}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        selectedGifts={selectedGifts}
        photo={profile?.photo}
        onSelectGift={onSelectGift}
        currentGiftSlot={currentGiftSlot}
        onSelectGiftSlot={setCurrentGiftSlot}
      />
    </Box>
  );
};

export default ProfileSettingsContent;
