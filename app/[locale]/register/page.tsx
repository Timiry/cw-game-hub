import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("RegisterPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.register,
        ru: routes.register,
      },
    },
  };
}

export { default } from "@/pages/register";
