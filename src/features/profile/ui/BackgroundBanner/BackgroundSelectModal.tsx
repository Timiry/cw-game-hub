"use client";

import type { BackgroundImage } from "@/entities/profile/model";
import { useTranslations } from "next-intl";
import { Button } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { BackgroundItemCard } from "./styles";

interface BackgroundSelectModalProps {
  open: boolean;
  onClose: () => void;
  selectedBackgroundId: number | null;
  onSelectBackground: (backgroundId: number) => void;
  backgrounds: BackgroundImage[];
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  currentBackgroundId?: number;
  onConfirm: () => void;
}

const BackgroundSelectModal = ({
  open,
  onClose,
  selectedBackgroundId,
  onSelectBackground,
  backgrounds,
  totalPages,
  page,
  onPageChange,
  currentBackgroundId,
  onConfirm,
}: BackgroundSelectModalProps) => {
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
      <DialogTitle>{t("selectBackground")}</DialogTitle>

      <DialogContent dividers>
        <>
          <Stack spacing={2}>
            {backgrounds.map((background) => {
              const isSelected = selectedBackgroundId === background.id;

              return (
                <BackgroundItemCard key={background.id} selected={isSelected}>
                  <CardActionArea
                    onClick={() => onSelectBackground(background.id)}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={background.url}
                      alt={`Background ${background.id}`}
                    />
                  </CardActionArea>
                </BackgroundItemCard>
              );
            })}
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

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" startIcon={<CloseIcon />}>
          {t("cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          startIcon={<CheckIcon />}
          disabled={selectedBackgroundId === currentBackgroundId}
        >
          {t("saveBackground")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackgroundSelectModal;
