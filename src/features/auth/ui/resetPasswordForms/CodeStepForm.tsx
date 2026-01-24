import { Button, Input, Typography } from "@cw-game/react-ui";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

interface CodeStepFormValues {
  code: string;
}

const CodeStepForm = ({
  onSubmitCallback,
  commitedEmail,
}: {
  onSubmitCallback: (values: CodeStepFormValues) => void;
  commitedEmail: string;
}) => {
  const t = useTranslations("ResetPasswordPage");

  const { control, handleSubmit, formState } = useForm<CodeStepFormValues>({
    defaultValues: { code: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitCallback)}>
      <Stack spacing="8px">
        <Typography variant="body1">
          {t("stepCodeText", { email: commitedEmail })}
        </Typography>{" "}
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
        <Button variant="contained" size="large" fullWidth type="submit">
          {t("nextButton")}
        </Button>
      </Stack>
    </form>
  );
};

export default CodeStepForm;
