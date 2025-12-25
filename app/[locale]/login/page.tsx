import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LoginPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.login,
        ru: routes.login,
      },
    },
  };
}

export { default } from "@/pages/login";
