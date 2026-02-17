import { z } from "zod";

export const createConfirmEmailSchema = (t: (key: string) => string) =>
  z.object({
    email: z.union([
      z.literal(""),
      z.string().email({
        message: t("invalidEmail"),
      }),
    ]),
    code: z.string(),
  });
