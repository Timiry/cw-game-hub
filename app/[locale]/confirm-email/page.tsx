import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ConfirmEmailPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.confirmEmail,
        ru: routes.confirmEmail,
      },
    },
  };
}

export { default } from "@/pages/confirmEmail";
