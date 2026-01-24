import { z } from "zod";

export const createEmailSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t("invalidEmail") }),
  });
