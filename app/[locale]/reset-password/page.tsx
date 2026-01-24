import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ResetPasswordPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.resetPassword,
        ru: "/ru" + routes.resetPassword,
      },
    },
  };
}

export { default } from "@/pages/resetPassword";
