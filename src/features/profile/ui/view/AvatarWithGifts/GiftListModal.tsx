"use client";

import type { Gift } from "@/entities/profile/model";
import { useTranslations } from "next-intl";
import { Typography, Link, IconButton, Tooltip } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NextLink from "next/link";
import Image from "next/image";
import { GiftListItem } from "./styles";

interface GiftsListModalProps {
  open: boolean;
  onClose: () => void;
  gifts: Gift[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isProfileMine: boolean;
  handleUpdateGift: (giftId: number, hidden: boolean) => void;
}

const GiftsListModal = ({
  open,
  onClose,
  gifts,
  page,
  totalPages,
  onPageChange,
  isProfileMine,
  handleUpdateGift,
}: GiftsListModalProps) => {
  const t = useTranslations("ProfilePage");

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
          },
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {t("allGifts")}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <>
          <Stack spacing={2}>
            {gifts.map((gift) => (
              <GiftListItem key={gift.giftId}>
                {!isProfileMine && gift.hidden ? (
                  <Box>{t("giftIsHidden")}</Box>
                ) : (
                  <>
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
                    {isProfileMine && (
                      <Tooltip title={gift.hidden ? t("show") : t("hide")}>
                        <IconButton
                          onClick={() =>
                            handleUpdateGift(gift.giftId, !gift.hidden)
                          }
                          size="small"
                        >
                          {gift.hidden ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </GiftListItem>
            ))}
          </Stack>

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

export default GiftsListModal;
