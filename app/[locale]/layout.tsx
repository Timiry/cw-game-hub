import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { StoreProvider } from "@/entities/app-state";
import { notFound } from "next/navigation";
import { routing } from "@/shared/i18n/routing";
import { getMessages } from "next-intl/server";
import { QueryProvider } from "@/shared/lib/react-query/query-provider";
import { ThemeProvider, CssBaseline } from "@cw-game/react-ui";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "@cw-game/react-ui/neucha";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher";
import Snackbar from "@/shared/ui/Snackbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://cw-game.ru"),
  title: {
    template: "%s - CW Game Hub",
    default: "CW Game Hub",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <QueryProvider>
            <StoreProvider>
              <NextIntlClientProvider messages={messages}>
                <ThemeProvider>
                  <CssBaseline />
                  <Snackbar />
                  <LocaleSwitcher />
                  {children}
                </ThemeProvider>
              </NextIntlClientProvider>
            </StoreProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
