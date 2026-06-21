"use client";

import { useRouter } from "@/shared/i18n/navigation";
import Image from "next/image";
import LanguageToggle from "@/shared/ui/LanguageToggle";
import { StyledHeader } from "./styles";
import Box from "@mui/material/Box";
import routes from "@/shared/config/routes";
import { useCurrentUserProfile } from "@/features/profile/lib/hooks";
import useLogout from "@/features/auth/lib/hooks/useLogout";
import { UserMenu } from "./ProfileMenu";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/entities/app-state";
import { Button } from "@cw-game/react-ui";

export default function Header() {
  const router = useRouter();
  const { data: profile } = useCurrentUserProfile();
  const logoutMutation = useLogout();
  const t = useTranslations("Header");
  const [openSnackbar] = useSnackbar();

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: (err) => {
        openSnackbar({
          message: t("signOutError") + " " + (err as Error)?.toString?.(),
          severity: "error",
        });
      },
    });
  };

  return (
    <StyledHeader>
      <Box
        onClick={() => router.push(routes.main)}
        position="relative"
        width={{ mobile: 90, tablet: 120 }}
        height={40}
        sx={{
          cursor: "pointer",
        }}
      >
        <Image src="/logo.svg" alt="CW Game logo" fill />
      </Box>
      <Box>
        <LanguageToggle />
        {profile ? (
          <UserMenu
            avatarUrl={profile?.photo}
            userName={profile?.name}
            onLogout={onLogout}
          />
        ) : (
          <Button onClick={() => router.push(routes.login)}>
            {t("signIn")}
          </Button>
        )}
      </Box>
    </StyledHeader>
  );
}
