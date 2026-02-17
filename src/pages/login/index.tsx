"use client";

import { Controller, useForm } from "react-hook-form";
import useLogin from "../../features/auth/lib/hooks/useLogin";
import CardLayout from "@/shared/ui/CardLayout";
import {
  Button,
  FullscreenLoader,
  Input,
  Link,
  Typography,
} from "@cw-game/react-ui";
import { postSuccessAuthMessage } from "../../features/auth/lib/utils/postMessages";
import routes from "@/shared/config/routes";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "@/shared/i18n/navigation";
import Grid from "@mui/material/Grid";
import TelegramLoginButton from "../../features/auth/ui/TelegramLoginButton";
import { useSnackbar } from "@/entities/app-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRegisterSchema } from "@/features/auth/lib/validation/createRegisterSchema";
import type { HubError } from "@/shared/lib/api/HubError";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const [openSnackbar] = useSnackbar();
  const schema = createRegisterSchema(t.raw);
  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });
  const { isPending, mutateAsync: login } = useLogin();

  const handleTelegramLogin = async (data: unknown) => {
    const user = await login({ telegram: data });
    if (window.opener) {
      postSuccessAuthMessage(user);
    } else {
      router.push(routes.main);
    }
  };

  const handleAccountsLogin = async (data: LoginFormValues) => {
    try {
      const user = await login({ accounts: data });
      if (window.opener) {
        postSuccessAuthMessage(user);
      } else {
        router.push(routes.main);
      }
    } catch (err) {
      const status = (err as HubError)?.status;
      switch (status) {
        case "BAD_CREDENTIALS":
          openSnackbar({
            message: t("badCredentials"),
          });
          return;
        case "INTERNAL":
          openSnackbar({
            message: t("internalError") + " " + (err as Error)?.toString?.(),
          });
          return;
        default:
          openSnackbar({
            message: t("genericError") + " " + (err as Error)?.toString?.(),
          });
      }
    }
  };

  return (
    <CardLayout onSubmit={handleSubmit(handleAccountsLogin)} component="form">
      {isPending && <FullscreenLoader />}
      <Grid container direction="column" rowSpacing="8px">
        <Grid>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                variant="filled"
                placeholder={t("emailPlaceholder")}
                error={Boolean(formState.errors.email)}
                helperText={formState.errors.email?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                variant="filled"
                type="password"
                placeholder={t("passwordPlaceholder")}
                error={Boolean(formState.errors.password)}
                helperText={formState.errors.password?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid mt="12px">
          <Button type="submit" variant="contained" fullWidth>
            {t("loginButton")}
          </Button>
        </Grid>
        <Grid textAlign="center">
          <Link component={NextLink} href={routes.resetPassword}>
            <Typography variant="caption" color="success.main">
              {t("forgotPasswordLink")}
            </Typography>
          </Link>
        </Grid>
        <Grid alignSelf="center" mt="4px">
          <TelegramLoginButton onLogin={handleTelegramLogin} />
        </Grid>
        <Grid textAlign="center">
          <Typography variant="caption">
            {t("noAccount")}{" "}
            <Link component={NextLink} href={routes.register}>
              <Typography
                component="span"
                variant="caption"
                color="success.main"
              >
                {t("registerLink")}
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </CardLayout>
  );
};

export default LoginPage;
