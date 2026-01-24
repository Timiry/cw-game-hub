"use client";

import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";
import { useRouter } from "@/shared/i18n/navigation";
import {
  Button,
  FullscreenLoader,
  Input,
  Link,
  Loader,
  Typography,
} from "@cw-game/react-ui";
import { useMutation } from "@tanstack/react-query";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "@/entities/app-state";
import CardLayout from "@/shared/ui/CardLayout";
import useUserProfile from "@/entities/profile/lib/hooks/useUserProfile";
import AuthService from "@/features/auth/api/AuthService";
import type { HubError } from "@/shared/lib/api/HubError";
import routes from "@/shared/config/routes";
import { postSuccessAuthMessage } from "@/features/auth/lib/utils/postMessages";
import { useTranslations } from "next-intl";

interface ConfirmEmailFormValues {
  code: string;
  email: string;
}

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [openSnackbar] = useSnackbar();
  const t = useTranslations("ConfirmEmailPage");
  const { isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
  });
  const { control, handleSubmit, setValue, setError, formState } =
    useForm<ConfirmEmailFormValues>({
      defaultValues: { code: "", email: "" },
    });
  const {
    data: user,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useUserProfile();
  const { isPending: isLoadingSendCode, mutateAsync: sendCodeMutation } =
    useMutation({
      mutationFn: AuthService.sendEmailCode,
    });
  const {
    isPending: isLoadingSendVerifyCode,
    mutateAsync: sendVerifyCodeQuery,
  } = useMutation({
    mutationFn: AuthService.verifyEmail,
  });

  const [isOpenChangeEmail, setOpenChangeEmail] = useState(false);
  const [codeAwaiting, setCodeAwaiting] = useState(false);
  const [committedEmail, setCommitedEmail] = useState<null | string>(null);

  const toggleInputToChangeEmail = () => {
    if (isOpenChangeEmail) setValue("email", "");
    setOpenChangeEmail((prev) => !prev);
  };

  const restartTimer = () => {
    const date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000);
    restart(date);
  };

  const resetTimer = useCallback(() => {
    restart(new Date());
  }, [restart]);

  const sendCode = async (data: ConfirmEmailFormValues) => {
    try {
      if (data.email) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
          setError("email", { message: t("invalidEmail") });
          return;
        }
      }
      await sendCodeMutation({ email: data.email });
      setCommitedEmail(data.email);
      setCodeAwaiting(true);
      restartTimer();
      setOpenChangeEmail(false);
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "ALREADY_SENT") {
        restartTimer();
        setOpenChangeEmail(false);
        setValue("email", "");
        openSnackbar({
          message: t("alreadySent"),
        });
      } else {
        openSnackbar({ message: t("genericError") });
      }
    }
  };

  const verifyCode = useCallback(
    async (code: string) => {
      try {
        await sendVerifyCodeQuery({ code });
        if (window.opener && user) {
          postSuccessAuthMessage(user);
        } else {
          router.push(routes.main);
        }
      } catch (err) {
        const status = (err as HubError)?.status;
        if (status === "EXPIRED") {
          openSnackbar({
            message: t("codeExpired"),
          });
          resetTimer();
        } else {
          setError("code", { message: t("invalidCode") });
        }
      }
    },
    [user, router, openSnackbar, resetTimer, setError, t, sendVerifyCodeQuery]
  );

  if (isUserProfileLoading)
    return (
      <CardLayout>
        <Loader />
      </CardLayout>
    );

  if (isUserProfileError)
    return (
      <CardLayout>
        <Typography variant="body1" color="error.main">
          {t("loadingError")}
        </Typography>
      </CardLayout>
    );

  if (user?.data?.confirmed)
    return (
      <CardLayout>
        <Typography variant="body1" color="success.main">
          {t("accountConfirmed")}
        </Typography>
      </CardLayout>
    );

  return (
    <CardLayout component="form" onSubmit={handleSubmit(sendCode)}>
      {(isLoadingSendCode || isLoadingSendVerifyCode) && <FullscreenLoader />}
      <Stack spacing="8px">
        <Typography variant="body1">{t("description")}</Typography>
        <Typography component="span" variant="body1">
          {isRunning
            ? t("codeSentTo", {
                email: committedEmail || user?.data?.email || "...",
              })
            : t("codeWillBeSentTo", {
                email: committedEmail || user?.data?.email || "...",
              })}
          {!isRunning && (
            <Link sx={{ cursor: "pointer" }} onClick={toggleInputToChangeEmail}>
              <Typography component="span" variant="body1" color="success.main">
                Изменить почту?
              </Typography>
            </Link>
          )}
        </Typography>
        <Collapse in={isOpenChangeEmail && !isRunning}>
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
        </Collapse>
        {!isRunning && (
          <Button variant="contained" size="large" fullWidth type="submit">
            {t("sendCodeButton")}
          </Button>
        )}
        <Collapse in={isRunning}>
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
                helperText={
                  formState.errors.code?.message || t("codeInputHelperText")
                }
                fullWidth
                inputMode="numeric"
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value.length === 7) {
                    verifyCode(e.target.value);
                  }
                }}
              />
            )}
          />
        </Collapse>
        {!isRunning && codeAwaiting && (
          <Typography variant="body1">{t("codeExpiredSnackbar")}</Typography>
        )}
      </Stack>
    </CardLayout>
  );
};

export default ConfirmEmailPage;
