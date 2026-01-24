import type { MetadataRoute } from "next";

const privateRoutes = [
  "/login",
  "/register",
  "/confirm-email",
  "/reset-password",
];

const enPrivateRoutes = privateRoutes.map((route) => `/en${route}`);
const ruPrivateRoutes = privateRoutes.map((route) => `/ru${route}`);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [...ruPrivateRoutes, ...enPrivateRoutes],
      },
    ],
    sitemap: "https://cw-game.ru/sitemap.xml",
  };
}
