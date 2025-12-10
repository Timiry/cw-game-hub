import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Подтверждение email",
};

export default function ConfirmEmail() {
  const t = useTranslations("ConfirmEmailPage");
  return <div>{t("title")}</div>;
}
