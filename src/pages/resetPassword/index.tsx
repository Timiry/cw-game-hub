"use client";

import { useSnackbar } from "@/entities/app-state";
import AuthService from "@/features/auth/api/AuthService";
import CodeStepForm from "@/features/auth/ui/resetPasswordForms/CodeStepForm";
import EmailStepForm from "@/features/auth/ui/resetPasswordForms/EmailStepForm";
import PasswordStepForm from "@/features/auth/ui/resetPasswordForms/PasswordStepForm";
import routes from "@/shared/config/routes";
import { useRouter } from "@/shared/i18n/navigation";
import type { HubError } from "@/shared/lib/api/HubError";
import CardLayout from "@/shared/ui/CardLayout";
import { FullscreenLoader } from "@cw-game/react-ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

type Step = "email" | "code" | "password";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [openSnackbar] = useSnackbar();
  const t = useTranslations("ResetPasswordPage");

  const [step, setStep] = useState<Step>("email");
  const [commitedEmail, setCommitedEmail] = useState<string>("");
  const [commitedCode, setCommitedCode] = useState<string>("");

  const { restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      openSnackbar({
        message: t("codeExpired"),
      });
      setStep("email");
    },
  });

  const restartTimer = () => {
    const date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000);
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

  const sendCode = async ({ email }: { email: string }) => {
    try {
      setCommitedEmail(email);
      await sendCodeMutation({ email });
      restartTimer();
      setStep("code");
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "ALREADY_SENT") {
        openSnackbar({
          message: t("alreadySent"),
          severity: "info",
        });
        setStep("code");
      } else {
        openSnackbar({
          message: t("genericError") + " " + (err as Error)?.toString?.(),
        });
      }
    }
  };

  const verifyCode = async ({ code }: { code: string }) => {
    try {
      if (code) {
        await verifyCodeQuery({ code });
        setCommitedCode(code);
        setStep("password");
      }
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "EXPIRED") {
        resetTimer();
      } else if (status === "WRONG_CODE") {
        openSnackbar({ message: t("invalidCode") });
      } else {
        openSnackbar({
          message: t("genericError") + " " + (err as Error)?.toString?.(),
        });
      }
    }
  };

  const applyPassword = async ({ password }: { password: string }) => {
    try {
      await applyCodeQuery({ code: commitedCode, password });
      router.push(routes.login);
    } catch (err) {
      const status = (err as HubError)?.status;
      if (status === "EXPIRED") {
        resetTimer();
      } else {
        openSnackbar({
          message: t("genericError") + " " + (err as Error)?.toString?.(),
        });
      }
    }
  };

  return (
    <CardLayout>
      {(isLoadingSendCode || isLoadingVerifyCode || isLoadingApplyPassword) && (
        <FullscreenLoader />
      )}
      {step === "email" && <EmailStepForm onSubmitCallback={sendCode} />}
      {step === "code" && (
        <CodeStepForm
          onSubmitCallback={verifyCode}
          commitedEmail={commitedEmail}
        />
      )}
      {step === "password" && (
        <PasswordStepForm onSubmitCallback={applyPassword} />
      )}
    </CardLayout>
  );
};

export default ResetPasswordPage;
