import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LoginPage");

  return {
    title: t("title"),
  };
}

export { default } from "@/pages/login";
