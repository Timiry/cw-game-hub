import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LegalPage");

  return {
    title: t("terms"),
    alternates: {
      languages: {
        en: "/en" + routes.legalTerms,
        ru: "/ru" + routes.legalTerms,
      },
    },
  };
}

export { default } from "@/pages/legalTerms";
