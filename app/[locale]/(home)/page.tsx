import { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: "Список миров",
}

export default function Home() {
  const t = useTranslations("ServerListPage");
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <Link href={"/register"}>{t("registerLink")}</Link>
      <Link href={"/login"}>{t("loginLink")}</Link>
      <Link href={"/confirm-email"}>{t("confirmEmailLink")}</Link>
    </div>
  );
}
