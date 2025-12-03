import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations("ServerListPage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: "/en",
        ru: "/ru",
      },
    },
  };
}

export { default } from "@/features/servers/page";
