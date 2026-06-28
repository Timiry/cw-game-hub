import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LegalPage");

  return {
    title: t("privacy"),
    alternates: {
      languages: {
        en: "/en" + routes.legalPrivacy,
        ru: "/ru" + routes.legalPrivacy,
      },
    },
  };
}

export { default } from "@/pages/legalPrivacy";
