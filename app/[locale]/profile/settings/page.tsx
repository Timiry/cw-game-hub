import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ProfileSettingsPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.myProfileSettings,
        ru: "/ru" + routes.myProfileSettings,
      },
    },
  };
}

export { default } from "@/pages/myProfileSettings";
