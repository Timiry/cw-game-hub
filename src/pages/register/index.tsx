"use client";

import { Button, FullscreenLoader } from "@cw-game/react-ui";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useRouter } from "@/shared/i18n/navigation";
import routes from "@/shared/config/routes";
import useRegister from "@/features/auth/lib/hooks/useRegister";
import { registerSchema } from "@/features/auth/lib/validation/registerSchema";
import CardLayout from "@/shared/ui/CardLayout";
import { useTranslations } from "next-intl";

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const t = useTranslations("RegisterPage");
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: { password: "", email: "" },
  });

  const { isPending, isError, mutateAsync: register } = useRegister();

  const handleAccountRegister = async (data: RegisterFormValues) => {
    await register({ accounts: data });
    router.push(routes.confirmEmail);
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
        {isError && (
          <Grid textAlign="center">
            <Typography variant="caption" color="error.main">
              {t("error")}
            </Typography>
          </Grid>
        )}
      </Grid>
    </CardLayout>
  );
};

export default RegisterPage;
