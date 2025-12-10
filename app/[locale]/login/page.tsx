import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Вход",
};

export default function Login() {
  const t = useTranslations("LoginPage");
  return <div>{t("title")}</div>;
}
