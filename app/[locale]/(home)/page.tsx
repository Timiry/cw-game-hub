import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServerListPage");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/en" + routes.main,
        ru: routes.main,
      },
    },
    openGraph: {
      title: "CW Game Hub",
      description: t("description"),
      images: ["/og/og-image.png"],
      type: "website",
    },
  };
}

export { default } from "@/pages/servers";
