import { z } from "zod";

export const createPasswordSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .min(8, { message: t("passwordTooShort") })
      .max(128, { message: t("passwordTooLong") }),
  });
