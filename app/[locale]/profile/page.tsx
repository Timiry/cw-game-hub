import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ProfilePage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en" + routes.myProfile,
        ru: "/ru" + routes.myProfile,
      },
    },
  };
}

export { default } from "@/pages/myProfile";
