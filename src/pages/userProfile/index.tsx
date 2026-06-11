"use client";

import Typography from "@mui/material/Typography";
import { FullscreenLoader } from "@cw-game/react-ui";

import ProfileView from "@/features/profile/ui/ProfileView";
import { useUserProfileById } from "@/features/profile/lib/hooks";
import { useParams } from "next/dist/client/components/navigation";
import { useTranslations } from "next-intl";

const UserProfilePage = () => {
  const t = useTranslations("ProfilePage");

  const params = useParams();
  const userId = params?.userId as string;
  const { data: profile, isLoading, error } = useUserProfileById(+userId);

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

  return <ProfileView profile={profile} isProfileMine={false} />;
};

export default UserProfilePage;
