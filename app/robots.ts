import type { MetadataRoute } from "next";

const privateRoutes = ['/login', '/register', '/confirm-email'];

const enPrivateRoutes = privateRoutes.map(route => `/en${route}`);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          ...privateRoutes,
          ...enPrivateRoutes
        ],
      },
    ],
    sitemap: "https://cw-game-hub.com/sitemap.xml",
  };
}