import { z } from "zod";
import { createContactSchema } from "./createContactsSchema";
import { PronounsEnum } from "@/entities/profile/model";

type TranslateFn = (key: string) => string;

export const createUpdateUserProfileSchema = (t: TranslateFn) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(30, t("nameTooLong")),

    quote: z.string().max(90, t("quoteTooLong")).nullable(),

    pronouns: z.enum(PronounsEnum).nullable(),

    contacts: z.array(createContactSchema(t)),

    aboutMe: z.string().max(10000, t("aboutMeTooLong")).nullable(),

    visitedWorldsHidden: z.boolean(),

    primaryGiftId: z.number().nullable(),
    secondaryGiftId: z.number().nullable(),
    tertiaryGiftId: z.number().nullable(),
  });
