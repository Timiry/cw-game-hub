import { z } from "zod";

export const createRegisterSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .min(8, { message: t("passwordTooShort") })
      .max(128, { message: t("passwordTooLong") }),
    email: z.string().email({ message: t("invalidEmail") }),
  });
