import { Button, Input, Typography } from "@cw-game/react-ui";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { createEmailSchema } from "../../lib/validation/createEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

interface EmailStepFormValues {
  email: string;
}

const EmailStepForm = ({
  onSubmitCallback,
}: {
  onSubmitCallback: (values: EmailStepFormValues) => void;
}) => {
  const t = useTranslations("ResetPasswordPage");
  const schema = createEmailSchema(t.raw);

  const { control, handleSubmit, formState } = useForm<EmailStepFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  return (
    <form onSubmit={handleSubmit(onSubmitCallback)}>
      <Stack spacing="8px">
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
        <Button variant="contained" size="large" fullWidth type="submit">
          {t("nextButton")}
        </Button>
      </Stack>
    </form>
  );
};

export default EmailStepForm;
