import { Button, Input, Typography } from "@cw-game/react-ui";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { createPasswordSchema } from "../../lib/validation/createPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

interface PasswordStepFormValues {
  password: string;
}

const PasswordStepForm = ({
  onSubmitCallback,
}: {
  onSubmitCallback: (values: PasswordStepFormValues) => void;
}) => {
  const t = useTranslations("ResetPasswordPage");
  const schema = createPasswordSchema(t.raw);

  const { control, handleSubmit, formState } = useForm<PasswordStepFormValues>({
    defaultValues: { password: "" },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  return (
    <form onSubmit={handleSubmit(onSubmitCallback)}>
      <Stack spacing="8px">
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
        <Button variant="contained" size="large" fullWidth type="submit">
          {t("changePasswordButton")}
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordStepForm;
