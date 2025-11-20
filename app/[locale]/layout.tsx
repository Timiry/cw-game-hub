import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import { StoreProvider } from '@/entities/app-state';
import {notFound} from 'next/navigation';
import {routing} from '@/shared/i18n/routing';
import { getMessages } from "next-intl/server";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher";
import { QueryProvider } from "@/shared/lib/query/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - CW Game Hub",
    default: ""
  },
  description: "",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <QueryProvider>
          <StoreProvider>
            <NextIntlClientProvider messages={messages}>
              <LocaleSwitcher />
              {children}
            </NextIntlClientProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
