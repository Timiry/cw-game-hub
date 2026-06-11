"use client";

import Typography from "@mui/material/Typography";
import { FullscreenLoader } from "@cw-game/react-ui";

import { useCurrentUserProfile } from "@/features/profile/lib/hooks";
import ProfileView from "@/features/profile/ui/ProfileView";
import { useTranslations } from "next-intl";

const MyProfilePage = () => {
  const t = useTranslations("ProfilePage");

  const { data: profile, isLoading, error } = useCurrentUserProfile();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (error || !profile) {
    return (
      <Typography color="error" textAlign="center" mt="100px">
        {t("failedToFetch")}
      </Typography>
    );
  }

  return <ProfileView profile={profile} isProfileMine={true} />;
};

export default MyProfilePage;
