"use client";

import { Typography, Paper } from "@cw-game/react-ui";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTranslations, useLocale } from "next-intl";
import { Stack } from "@mui/material";
import type { UserProfile } from "@/entities/profile/model";
import { BackgroundBannerContainer } from "../BackgroundBanner/styles";
import BackgroundBannerSettings from "@/features/profile/ui/view/BackgroundBanner/BackgroundBannerSettings";
import { AvatarWithGifts } from "../AvatarWithGifts";
import { getPronounLabel } from "../../../lib/getPronounLabel";
import { ContactsList } from "../ContactsList";
import { VisitedWorldsList } from "../VisitedWorldsList";
import { Quote } from "./styles";
import { format } from "date-fns";
import SettingsButton from "../SettingsButton";
import SafeHtml from "@/shared/ui/SafeHtml";
import { cleanEmptyHtml } from "@/shared/lib/html/cleamEmptyHtml";

interface ProfileViewProps {
  profile: UserProfile;
  isProfileMine: boolean;
}

const ProfileView = ({ profile, isProfileMine }: ProfileViewProps) => {
  const t = useTranslations("ProfilePage");
  const locale = useLocale();

  const cleanedAbouMe = cleanEmptyHtml(profile.aboutMe || "");

  return (
    <Box>
      <BackgroundBannerContainer
        image={profile.background || "/background-fallback.svg"}
        className="hover-parent"
      >
        {isProfileMine && (
          <BackgroundBannerSettings backgroundId={profile.backgroundId} />
        )}
      </BackgroundBannerContainer>

      <Box
        width={{ mobile: "90%", desktop: "80%" }}
        maxWidth="1200px"
        mx="auto"
        mb={5}
      >
        <Stack
          direction="row"
          gap={{ mobile: 2, tablet: 3, desktop: 5 }}
          mb={{ mobile: 2, desktop: 4 }}
        >
          <AvatarWithGifts profile={profile} isProfileMine={isProfileMine} />

          <Box flex={1} minWidth={0}>
            <Typography
              fontSize={{ mobile: "1.5rem", tablet: "2rem", desktop: "2.5rem" }}
            >
              {profile.name || t("nameFallback")}
            </Typography>

            {locale === "en" && profile.pronouns && (
              <Typography mt={0.5} color="text.secondary">
                {getPronounLabel(profile.pronouns)}
              </Typography>
            )}
          </Box>

          <Box mt={1}>{isProfileMine && <SettingsButton />}</Box>
        </Stack>

        <Stack direction={{ mobile: "column", desktop: "row-reverse" }}>
          <Box flex={1}>
            {profile.quote && <Quote>{profile.quote}</Quote>}

            <Stack
              direction={{ mobile: "column", tablet: "row" }}
              spacing={{ mobile: 1, tablet: 3 }}
              mb={3}
            >
              <Typography color="text.secondary">
                {t("registered")}{" "}
                <Typography component="span" color="textPrimary">
                  {profile.registrationTime
                    ? format(new Date(profile.registrationTime), "dd.MM.yyyy")
                    : "-"}
                </Typography>
              </Typography>

              <Typography color="text.secondary">
                {t("lastVisit")}{" "}
                <Typography component="span" color="textPrimary">
                  {profile.lastActivityTime
                    ? format(
                        new Date(profile.lastActivityTime),
                        "dd.MM.yyyy HH:mm"
                      )
                    : "-"}
                </Typography>
              </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {cleanedAbouMe && (
              <Box mb={3}>
                <Typography variant="h5" gutterBottom>
                  {t("aboutMe")}
                </Typography>
                <Paper component={Box} p={3}>
                  <SafeHtml html={cleanedAbouMe} />
                </Paper>
              </Box>
            )}
          </Box>

          <Box width="300px">
            <ContactsList contacts={profile.contacts} />
            <VisitedWorldsList
              worlds={profile.visitedWorlds}
              hidden={profile.visitedWorldsHidden}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileView;
