import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function Register() {
  const t = useTranslations("RegisterPage");
  return <div>{t("title")}</div>;
}
