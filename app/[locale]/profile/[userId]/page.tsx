import routes from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const id = Number(userId);
  const t = await getTranslations("ProfilePage");

  return {
    title: t("title"),
    alternates: {
      languages: {
        en: `/en${routes.userProfile(id)}`,
        ru: `/ru${routes.userProfile(id)}`,
      },
    },
  };
}

export { default } from "@/pages/userProfile";
