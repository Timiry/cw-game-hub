"use client";

import { useSnackbar } from "@/entities/app-state";
import AuthService from "@/features/auth/api/AuthService";
import routes from "@/shared/config/routes";
import { useRouter } from "@/shared/i18n/navigation";
import type { HubError } from "@/shared/lib/api/HubError";
import CardLayout from "@/shared/ui/CardLayout";
import { Button, FullscreenLoader, Input, Typography } from "@cw-game/react-ui";
import { Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";

interface ResetPasswordFormValues {
  email: string;
  code: string;
  password: string;
}

type Step = "email" | "code" | "password";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [openSnackbar] = useSnackbar();
  const t = useTranslations("ResetPasswordPage");
  const { control, handleSubmit, setValue, setError, formState } =
    useForm<ResetPasswordFormValues>({
      defaultValues: { email: "", code: "", password: "" },
    });

  const [step, setStep] = useState<Step>("email");
  const [committedEmail, setCommitedEmail] = useState<string>("");

  const { restart, pause: pauseTimer } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      openSnackbar({
        message: t("codeExpired"),
      });
      setValue("code", "");
      setStep("email");
    },
  });

  const restartTimer = () => {
    const date = new Date();
    date.setTime(date.getTime() + 15 * 60 * 1000);
    restart(date);
  };

  const resetTimer = () => {
    restart(new Date());
  };

  const { isPending: isLoadingSendCode, mutateAsync: sendCodeMutation } =
    useMutation({
      mutationFn: AuthService.sendPasswordCode,
    });
  const { isPending: isLoadingVerifyCode, mutateAsync: verifyCodeQuery } =
    useMutation({
      mutationFn: AuthService.verifyPasswordCode,
    });
  const { isPending: isLoadingApplyPassword, mutateAsync: applyCodeQuery } =
    useMutation({
      mutationFn: AuthService.applyPassword,
    });

  const sendCode = async (data: ResetPasswordFormValues) => {
    try {
      if (data.email) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
          setError("email", { message: t("invalidEmail") });
          return;
        }
        setCommitedEmail(data.email);
        await sendCodeMutation({ email: data.email });
        restartTimer();
        setStep("code");
      }
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "ALREADY_SENT") {
        restartTimer();
        openSnackbar({
          message: t("alreadySent"),
        });
        setStep("code");
      } else {
        openSnackbar({ message: t("genericError") });
      }
    }
  };

  const verifyCode = async (data: ResetPasswordFormValues) => {
    try {
      if (data.code) {
        await verifyCodeQuery({ code: data.code });
        pauseTimer();
        setStep("password");
      }
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "EXPIRED") {
        resetTimer();
      } else {
        setError("code", { message: t("invalidCode") });
      }
    }
  };

  const applyPassword = async (data: ResetPasswordFormValues) => {
    try {
      if (data.password.length < 8) {
        setError("password", { message: t("passwordTooShort") });
        return;
      }
      if (data.password.length > 128) {
        setError("password", { message: t("passwordTooLong") });
        return;
      }
      await applyCodeQuery({ code: data.code, password: data.password });
      router.push(routes.login);
    } catch (err) {
      void err; // обход обшибки ts о неиспользовании err
      openSnackbar({ message: t("genericError") });
    }
  };

  return (
    <CardLayout
      component="form"
      onSubmit={
        step === "email"
          ? handleSubmit(sendCode)
          : step === "code"
            ? handleSubmit(verifyCode)
            : handleSubmit(applyPassword)
      }
    >
      {(isLoadingSendCode || isLoadingVerifyCode || isLoadingApplyPassword) && (
        <FullscreenLoader />
      )}
      <Stack spacing="8px">
        {step === "email" && (
          <>
            <Typography variant="body1">{t("stepEmailText")}</Typography>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="filled"
                  size="medium"
                  placeholder={t("emailInputPlaceholder")}
                  error={Boolean(formState.errors.email)}
                  helperText={formState.errors.email?.message}
                  fullWidth
                />
              )}
            />
          </>
        )}
        {step === "code" && (
          <>
            <Typography variant="body1">
              {t("stepCodeText", { email: committedEmail })}
            </Typography>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="filled"
                  size="medium"
                  placeholder={t("codeInputPlaceholder")}
                  error={Boolean(formState.errors.code)}
                  helperText={formState.errors.code?.message}
                  fullWidth
                  inputMode="numeric"
                />
              )}
            />
          </>
        )}
        {step === "password" && (
          <>
            <Typography variant="body1">{t("stepPasswordText")}</Typography>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="filled"
                  type="password"
                  size="medium"
                  placeholder={t("passwordInputPlaceholder")}
                  error={Boolean(formState.errors.password)}
                  helperText={formState.errors.password?.message}
                  fullWidth
                />
              )}
            />
          </>
        )}
        <Button variant="contained" size="large" fullWidth type="submit">
          {step === "password" ? t("changePasswordButton") : t("nextButton")}
        </Button>
      </Stack>
    </CardLayout>
  );
};

export default ResetPasswordPage;
