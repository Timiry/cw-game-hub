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
import useUser from "@/entities/user/lib/hooks/useUser";
import AuthService from "@/features/auth/api/AuthService";
import type { HubError } from "@/shared/lib/api/HubError";
import routes from "@/shared/config/routes";
import { postSuccessAuthMessage } from "@/features/auth/lib/utils/postMessages";
import { useTranslations } from "next-intl";
import { createConfirmEmailSchema } from "@/features/auth/lib/validation/createConfirmEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const schema = createConfirmEmailSchema(t.raw);
  const { control, handleSubmit, setValue, formState } =
    useForm<ConfirmEmailFormValues>({
      resolver: zodResolver(schema),
      mode: "onSubmit",
      defaultValues: { code: "", email: "" },
    });
  const {
    data: user,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = useUser();
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
      await sendCodeMutation({ email: data.email });
      setCommitedEmail(data.email);
      setCodeAwaiting(true);
      restartTimer();
      setOpenChangeEmail(false);
    } catch (err) {
      const status = (err as HubError)?.status;
      switch (status) {
        case "ALREADY_SENT":
          setOpenChangeEmail(false);
          setValue("email", "");
          openSnackbar({
            message: t("alreadySent"),
            severity: "info",
          });
          return;
        case "NOT_FOUND_CODE":
          openSnackbar({ message: t("notFoundCode") });
          return;
        case "USER_ALREADY_EXIST":
          openSnackbar({ message: t("alreadyExistError") });
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
        switch (status) {
          case "CODE_EXPIRED":
            openSnackbar({
              message: t("codeExpired"),
            });
            resetTimer();
            return;
          case "WRONG_CODE":
            openSnackbar({ message: t("invalidCode") });
            return;
          case "ATTEMPTS_LIMIT":
            openSnackbar({ message: t("attemptsLimit") });
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
    },
    [user, router, openSnackbar, resetTimer, t, sendVerifyCodeQuery]
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
