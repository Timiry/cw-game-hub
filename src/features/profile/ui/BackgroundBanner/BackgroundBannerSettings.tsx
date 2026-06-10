"use client";

import { useState } from "react";
import { HoverOverlay } from "./styles";
import { Button } from "@cw-game/react-ui";
import { useTranslations } from "next-intl";
import {
  useBackgroundImages,
  useSelectBackground,
} from "@/features/profile/lib/hooks";
import { useSnackbar } from "@/entities/app-state";
import BackgroundSelectModal from "./BackgroundSelectModal";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
const PAGE_SIZE = 4;

const BackgroundBannerSettings = ({
  backgroundId,
}: {
  backgroundId?: number;
}) => {
  const t = useTranslations("ProfilePage");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));
  const [open, setOpen] = useState(false);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<
    number | null
  >(null);
  const [page, setPage] = useState(0);

  const { data: backgroundsData } = useBackgroundImages(PAGE_SIZE, page);
  const selectBackgroundMutation = useSelectBackground();
  const [openSnackbar] = useSnackbar();

  const backgrounds = backgroundsData?.content || [];
  const totalPages = backgroundsData?.totalPages || 0;

  const handleOpenModal = () => {
    setSelectedBackgroundId(backgroundId || null);
    setPage(0);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedBackgroundId(null);
  };

  const handleSelectBackground = (backgroundId: number) => {
    setSelectedBackgroundId(backgroundId);
  };

  const handleConfirm = () => {
    if (!selectedBackgroundId || selectedBackgroundId === backgroundId) {
      handleCloseModal();
      return;
    }

    selectBackgroundMutation.mutate(
      { backgroundId: selectedBackgroundId },
      {
        onSuccess: () => {
          openSnackbar({
            message: t("backgroundChangedSuccess"),
            severity: "success",
          });
          handleCloseModal();
        },
        onError: (err) => {
          openSnackbar({
            message:
              t("backgroundChangedError") + " " + (err as Error)?.toString?.(),
            severity: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <HoverOverlay>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          sx={{ position: "absolute", right: 24, bottom: "10%" }}
        >
          <EditIcon fontSize="small" />
          {!isMobile && (
            <Typography ml={1}> {t("changeBackground")} </Typography>
          )}
        </Button>
      </HoverOverlay>

      <BackgroundSelectModal
        open={open}
        onClose={handleCloseModal}
        selectedBackgroundId={selectedBackgroundId}
        onSelectBackground={handleSelectBackground}
        backgrounds={backgrounds}
        totalPages={totalPages}
        page={page}
        onPageChange={setPage}
        currentBackgroundId={backgroundId}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default BackgroundBannerSettings;
