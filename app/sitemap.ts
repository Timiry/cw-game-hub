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
    {
      url: `${baseUrl}/en/server-list`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/server-list`,
          en: `${baseUrl}/en/server-list`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/server-list`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/server-list`,
          en: `${baseUrl}/en/server-list`,
        },
      },
    },
    {
      url: `${baseUrl}/en/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal`,
          en: `${baseUrl}/en/legal`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal`,
          en: `${baseUrl}/en/legal`,
        },
      },
    },
    {
      url: `${baseUrl}/en/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/terms`,
          en: `${baseUrl}/en/legal/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/terms`,
          en: `${baseUrl}/en/legal/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/en/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/privacy`,
          en: `${baseUrl}/en/legal/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          ru: `${baseUrl}/ru/legal/privacy`,
          en: `${baseUrl}/en/legal/privacy`,
        },
      },
    },
  ];
}
