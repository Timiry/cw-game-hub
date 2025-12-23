import { z } from "zod";

export const registerSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Пароль слишком простой. Используйте больше символов" })
    .max(128, {
      message: "Пароль слишком длинный. Используйте меньше символов",
    }),
  email: z.string().email({ message: "Некорректная почта" }),
});
