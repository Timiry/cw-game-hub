import { Button, IconButton, Typography } from "@cw-game/react-ui";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { createPasswordSchema } from "../../lib/validation/createPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

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
  const [showPassword, setShowPassword] = useState(false);

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
            <TextField
              {...field}
              variant="filled"
              type={showPassword ? "text" : "password"}
              size="medium"
              placeholder={t("passwordInputPlaceholder")}
              error={Boolean(formState.errors.password)}
              helperText={formState.errors.password?.message}
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
        <Button variant="contained" size="large" fullWidth type="submit">
          {t("changePasswordButton")}
        </Button>
      </Stack>
    </form>
  );
};

export default PasswordStepForm;
