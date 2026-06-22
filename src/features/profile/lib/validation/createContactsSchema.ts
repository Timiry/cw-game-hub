import { z } from "zod";

type TranslateFn = (key: string) => string;

const VK_URL_REGEX = /^https?:\/\/(www\.|m\.)?vk\.(com|ru)\/(.+)$/;
const VK_USERNAME_REGEX = /^[a-zA-Z0-9._]{1,32}$/;
const TELEGRAM_URL_REGEX = /^https?:\/\/(t\.me|telegram\.me)\/(.+)$/;
const TELEGRAM_USERNAME_REGEX = /^[a-zA-Z0-9_]{1,32}$/;

export const createVkLinkSchema = (t: TranslateFn) =>
  z.string().refine(
    (val) => {
      const match = val.match(VK_URL_REGEX);

      if (!match) return false;

      const username = match[2].split("?")[0];
      return VK_USERNAME_REGEX.test(username);
    },
    { message: t("invalidVkLink") }
  );

export const createTelegramLinkSchema = (t: TranslateFn) =>
  z.string().refine(
    (val) => {
      const match = val.match(TELEGRAM_URL_REGEX);

      if (!match) return false;

      const username = match[2].split("?")[0];
      return TELEGRAM_USERNAME_REGEX.test(username);
    },
    { message: t("invalidTelegramLink") }
  );

export const createContactSchema = (t: TranslateFn) =>
  z
    .object({
      type: z.enum(["vk", "telegram"]),
      link: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.link === "") return;
      if (data.type === "vk") {
        const result = createVkLinkSchema(t).safeParse(data.link);
        if (!result.success) {
          ctx.addIssue({
            path: ["link"],
            code: "custom",
            message: result.error.issues[0].message,
          });
        }
      } else if (data.type === "telegram") {
        const result = createTelegramLinkSchema(t).safeParse(data.link);
        if (!result.success) {
          ctx.addIssue({
            path: ["link"],
            code: "custom",
            message: result.error.issues[0].message,
          });
        }
      }
    });
