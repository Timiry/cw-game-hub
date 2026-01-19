import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cw-game.ru";

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];
}
