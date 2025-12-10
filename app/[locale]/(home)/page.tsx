import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServerListPage");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/en",
        ru: "/ru",
      },
    },
    openGraph: {
      title: "CW Game Hub",
      description: t("description"),
      images: ["/public/og/og-image.png"],
      type: "website",
    },
  };
}

export { default } from "@/pages/servers";
