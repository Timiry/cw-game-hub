"use client";

import { Button, FullscreenLoader } from "@cw-game/react-ui";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useRouter } from "@/shared/i18n/navigation";
import routes from "@/shared/config/routes";
import useRegister from "@/features/auth/lib/hooks/useRegister";
import { createRegisterSchema } from "@/features/auth/lib/validation/createRegisterSchema";
import CardLayout from "@/shared/ui/CardLayout";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/entities/app-state";
import type { HubError } from "@/shared/lib/api/HubError";

type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;

const RegisterPage = () => {
  const t = useTranslations("RegisterPage");
  const router = useRouter();
  const schema = createRegisterSchema(t.raw);
  const [openSnackbar] = useSnackbar();

  const { control, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: { password: "", email: "" },
  });

  const { isPending, mutateAsync: register } = useRegister();

  const handleAccountRegister = async (data: RegisterFormValues) => {
    try {
      await register({ accounts: data });
      router.push(routes.confirmEmail);
    } catch (err) {
      const status = (err as HubError)?.status;
      switch (status) {
        case "USER_ALREADY_EXIST":
          openSnackbar({
            message: t("alreadyExistError"),
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
    <CardLayout component="form" onSubmit={handleSubmit(handleAccountRegister)}>
      {isPending && <FullscreenLoader />}
      <Grid container direction="column" rowSpacing="8px">
        <Grid>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                size="medium"
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
              <TextField
                {...field}
                variant="filled"
                size="medium"
                placeholder={t("passwordPlaceholder")}
                error={Boolean(formState.errors.password)}
                helperText={formState.errors.password?.message}
                type="password"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid mt="12px">
          <Button type="submit" variant="contained" fullWidth>
            {t("registerButton")}
          </Button>
        </Grid>
      </Grid>
    </CardLayout>
  );
};

export default RegisterPage;
