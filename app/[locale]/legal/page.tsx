import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LegalPage");

  return {
    title: t("legalDocs"),
    alternates: {
      languages: {
        en: "/en" + routes.legal,
        ru: "/ru" + routes.legal,
      },
    },
  };
}

export { default } from "@/pages/legal";
