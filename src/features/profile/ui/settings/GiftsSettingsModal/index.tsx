"use client";

import type { Gift } from "@/entities/profile/model";
import { useTranslations } from "next-intl";
import { Typography, Link, IconButton } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import NextLink from "next/link";
import Image from "next/image";
import { GiftListItem } from "./styles";
import { AvatarContainer } from "../../avatar/styles";
import Avatar from "@mui/material/Avatar";
import { GiftItemWrapper, GiftsOverlayContainer } from "../../gifts/styles";
import { GiftItem } from "../../gifts/GiftItem";
import type { GiftSlots } from "../AvatarWithGiftSettings";

interface GiftsSettingsModalProps {
  open: boolean;
  onClose: () => void;
  gifts: Gift[];
  selectedGifts: {
    primaryGift: Gift | null;
    secondaryGift: Gift | null;
    tertiaryGift: Gift | null;
  };
  photo?: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectGift: (type: GiftSlots, gift: Gift | null) => void;
  currentGiftSlot: GiftSlots;
  onSelectGiftSlot: (type: GiftSlots) => void;
}

const GiftsSettingsModal = ({
  open,
  onClose,
  gifts,
  selectedGifts,
  photo,
  page,
  totalPages,
  onPageChange,
  onSelectGift,
  currentGiftSlot,
  onSelectGiftSlot,
}: GiftsSettingsModalProps) => {
  const t = useTranslations("ProfileSettingsPage");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="tablet"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
            "&:focus": {
              outline: "none",
            },
          },
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {t("giftsModalTitle")}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <>
          <AvatarContainer m="0 auto 35px">
            <Avatar
              src={photo || "/avatar-fallback.svg"}
              variant="rounded"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
            <GiftsOverlayContainer>
              <GiftItemWrapper
                $position="left"
                border="dashed 2px"
                borderColor={
                  currentGiftSlot === "primaryGift" ? "success.main" : ""
                }
              >
                <GiftItem
                  gift={selectedGifts.primaryGift}
                  handleClick={() => onSelectGiftSlot("primaryGift")}
                />
              </GiftItemWrapper>

              <GiftItemWrapper
                $position="right"
                border="dashed 2px"
                borderColor={
                  currentGiftSlot === "secondaryGift" ? "success.main" : ""
                }
              >
                <GiftItem
                  gift={selectedGifts.secondaryGift}
                  handleClick={() => onSelectGiftSlot("secondaryGift")}
                />
              </GiftItemWrapper>

              <GiftItemWrapper
                $position="center"
                border="dashed 2px"
                borderColor={
                  currentGiftSlot === "tertiaryGift" ? "success.main" : ""
                }
              >
                <GiftItem
                  gift={selectedGifts.tertiaryGift}
                  handleClick={() => onSelectGiftSlot("tertiaryGift")}
                />
              </GiftItemWrapper>
            </GiftsOverlayContainer>
          </AvatarContainer>

          {gifts.length === 0 ? (
            <Typography textAlign="center" mt={6}>
              {t("noGiftsYet")}
            </Typography>
          ) : (
            <Stack spacing={2}>
              <GiftListItem
                sx={{
                  borderColor:
                    selectedGifts[currentGiftSlot] === null
                      ? "success.main"
                      : "",
                }}
                onClick={() => onSelectGift(currentGiftSlot, null)}
              >
                <Typography>{t("notSelected")}</Typography>
                {selectedGifts[currentGiftSlot] === null && (
                  <CheckIcon sx={{ color: "success.main", ml: "auto" }} />
                )}
              </GiftListItem>

              {gifts.map((gift) => {
                const isSelected =
                  selectedGifts[currentGiftSlot]?.giftId === gift.giftId;
                return (
                  <GiftListItem
                    key={gift.giftId}
                    sx={{ borderColor: isSelected ? "success.main" : "" }}
                    onClick={() => onSelectGift(currentGiftSlot, gift)}
                  >
                    <Box position="relative" width={60} height={60}>
                      <Image
                        src={gift.imageUrl}
                        alt="gift"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>

                    <Box flex={1} minWidth={0}>
                      <Link
                        component={NextLink}
                        href={`/profile/${gift.senderId}`}
                        onClick={onClose}
                      >
                        {gift.senderName}
                      </Link>
                      {gift.text && (
                        <Typography variant="body2" mt={1}>
                          {gift.text}
                        </Typography>
                      )}
                    </Box>

                    {isSelected && (
                      <CheckIcon sx={{ color: "success.main", ml: 1 }} />
                    )}
                  </GiftListItem>
                );
              })}
            </Stack>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(_, newPage) => onPageChange(newPage - 1)}
                color="primary"
                siblingCount={0}
                boundaryCount={1}
              />
            </Box>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default GiftsSettingsModal;
