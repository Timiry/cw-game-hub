"use client";

import { FullscreenLoader } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import { SettingsSidebar } from "@/features/profile/ui/settings/SettingsSidebar";
import { useState } from "react";
import {
  useCurrentUserProfile,
  useUpdateProfile,
} from "@/features/profile/lib/hooks";
import { useTranslations } from "next-intl";
import type { UpdateUserProfileRequest } from "@/entities/profile/model";
import { useSnackbar } from "@/entities/app-state";
import ProfileSettingsContent from "@/features/profile/ui/settings/ProfileSettingsContent";

const UserProfilePage = () => {
  const [openSnackbar] = useSnackbar();
  const [activeSection, setActiveSection] = useState("appearance");

  const t = useTranslations("ProfileSettingsPage");

  const { data: profile, isLoading } = useCurrentUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const onUpdateProfile = (data: UpdateUserProfileRequest) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        openSnackbar({
          message: t("savedSuccess"),
          severity: "success",
        });
      },
      onError: (err) => {
        openSnackbar({
          message: t("savedError") + " " + (err as Error)?.toString?.(),
          severity: "error",
        });
      },
    });
  };

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <Box
      display="flex"
      flexDirection={{ mobile: "column", desktop: "row" }}
      mt="71px"
    >
      <SettingsSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {profile && activeSection === "appearance" && (
        <ProfileSettingsContent
          profile={profile}
          onUpdateProfile={onUpdateProfile}
        />
      )}
    </Box>
  );
};

export default UserProfilePage;
