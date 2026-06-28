"use client";

import { Button, FullscreenLoader, IconButton, Link } from "@cw-game/react-ui";
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
import { useLocale, useTranslations } from "next-intl";
import { useSnackbar } from "@/entities/app-state";
import type { HubError } from "@/shared/lib/api/HubError";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NextLink from "next/link";

type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;

const RegisterPage = () => {
  const t = useTranslations("RegisterPage");
  const locale = useLocale();

  const router = useRouter();
  const schema = createRegisterSchema(t.raw);
  const [openSnackbar] = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isGdprflagChecked, setIsGdprflagChecked] = useState(false);

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
                type={showPassword ? "text" : "password"}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid mt="24px">
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
            }
            label={
              <>
                {t("agreePrefix")}{" "}
                <Link component={NextLink} href={routes.legalTerms}>
                  {t("termsOfService")}
                </Link>{" "}
                {t("and")}{" "}
                <Link component={NextLink} href={routes.legalPrivacy}>
                  {t("privacyPolicy")}
                </Link>
              </>
            }
          />
        </Grid>

        {locale === "en" && (
          <Grid mt="12px">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isGdprflagChecked}
                  onChange={(e) => setIsGdprflagChecked(e.target.checked)}
                />
              }
              label="I explicitly consent to my data being stored in the Russian Federation, a country without a GDPR adequacy decision, and understand the associated risks"
            />
          </Grid>
        )}

        <Grid mt="24px">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isAgreed || (locale === "en" && !isGdprflagChecked)}
          >
            {t("registerButton")}
          </Button>
        </Grid>
      </Grid>
    </CardLayout>
  );
};

export default RegisterPage;
