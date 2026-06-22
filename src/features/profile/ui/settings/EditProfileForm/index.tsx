"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { Button, Typography } from "@cw-game/react-ui";
import { createUpdateUserProfileSchema } from "@/features/profile/lib/validation/createEditProfileSchema";
import type {
  Contacts,
  UpdateUserProfileRequest,
  UserProfile,
} from "@/entities/profile/model";
import { PronounsEnum } from "@/entities/profile/model";
import { getPronounLabel } from "@/features/profile/lib/getPronounLabel";
import {
  StyledTelegramIcon,
  StyledVkIcon,
} from "../../view/ContactsList/styles";
import TextEditor from "../../../../../shared/ui/TextEditor";

interface EditProfileFormProps {
  initialData: UserProfile;
  onSubmit: (data: UpdateUserProfileRequest) => void;
}

const findContactByType = (
  contacts: Contacts[],
  type: "vk" | "telegram"
): string => {
  return contacts.find((c) => c.type === type)?.link || "";
};

export const EditProfileForm = ({
  initialData,
  onSubmit,
}: EditProfileFormProps) => {
  const t = useTranslations("ProfileSettingsPage");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserProfileRequest>({
    resolver: zodResolver(createUpdateUserProfileSchema(t)),
    defaultValues: {
      ...initialData,
      contacts: [
        {
          type: "vk" as const,
          link: findContactByType(initialData.contacts, "vk"),
        },
        {
          type: "telegram" as const,
          link: findContactByType(initialData.contacts, "telegram"),
        },
      ],
      primaryGiftId: initialData.primaryGift?.giftId || null,
      secondaryGiftId: initialData.secondaryGift?.giftId || null,
      tertiaryGiftId: initialData.tertiaryGift?.giftId || null,
    },
  });

  const handleFormSubmit = async (data: UpdateUserProfileRequest) => {
    const validContacts = data.contacts.filter(
      (contact) => contact.link.trim() !== ""
    );

    await onSubmit({
      ...data,
      contacts: validContacts,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      display="flex"
      flexDirection="column"
      gap={3}
      mb={6}
    >
      <Box>
        <Typography gutterBottom>{t("name")}</Typography>
        <TextField
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          placeholder={t("nameFallback")}
          {...register("name")}
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box>
        <Typography gutterBottom>{t("quote")}</Typography>
        <TextField
          error={Boolean(errors.quote)}
          helperText={errors.quote?.message}
          placeholder={t("quotePlaceholder")}
          {...register("quote")}
          multiline
          rows={2}
          variant="outlined"
          fullWidth
        />
      </Box>

      {locale === "en" && (
        <Box>
          <Typography gutterBottom>{t("pronoun")}</Typography>
          <Controller
            name="pronouns"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset">
                <RadioGroup
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body2">
                        {getPronounLabel(null)}
                      </Typography>
                    }
                  />
                  {Object.values(PronounsEnum).map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="body2">
                          {getPronounLabel(option)}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </Box>
      )}

      <Box>
        <Typography gutterBottom>{t("aboutMe")}</Typography>
        <TextEditor
          initialData={initialData.aboutMe || ""}
          onChange={(data: string) => setValue("aboutMe", data)}
        />
        {errors.aboutMe && (
          <Typography variant="caption" color="error" pt={1}>
            {errors.aboutMe.message}
          </Typography>
        )}
      </Box>

      <Box>
        <Typography gutterBottom>{t("contacts")}</Typography>

        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          <StyledVkIcon />
          <TextField
            error={Boolean(errors.contacts?.[0]?.link)}
            helperText={errors.contacts?.[0]?.link?.message}
            placeholder="https://vk.com/username"
            {...register("contacts.0.link")}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          mt={1}
        >
          <StyledTelegramIcon />
          <TextField
            error={Boolean(errors.contacts?.[1]?.link)}
            helperText={errors.contacts?.[1]?.link?.message}
            placeholder="https://t.me/username"
            {...register("contacts.1.link")}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>

      <Controller
        name="visitedWorldsHidden"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={field.onChange}
                color="primary"
              />
            }
            label={t("hideVisitedWorlds")}
          />
        )}
      />

      <Button type="submit" variant="contained" fullWidth>
        {t("save")}
      </Button>
    </Box>
  );
};
