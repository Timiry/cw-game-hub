import { getTranslations } from "next-intl/server";
import CardLayout from "@/shared/ui/CardLayout";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Typography,
} from "@cw-game/react-ui";
import "@cw-game/react-ui/neucha";
import { Box } from "@mui/material";
import routes from "@/shared/config/routes";
import Link from "next/link";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export async function generateMetadata() {
  const t = await getTranslations("NotFoundPage");
  return {
    title: t("title"),
  };
}

export default async function GlobalNotFound() {
  const t = await getTranslations("NotFoundPage");
  const messages = await getMessages();

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <CssBaseline />
              <CardLayout mt={"160px"}>
                <Box sx={{ textAlign: "center", padding: "32px" }}>
                  <Typography variant="h3" mb={"16px"}>
                    {t("heading")}
                  </Typography>
                  <Typography variant="body1" mb={"24px"}>
                    {t("description")}
                  </Typography>
                  <Button
                    component={Link}
                    href={routes.main}
                    variant="contained"
                  >
                    {t("backToHome")}
                  </Button>
                </Box>
              </CardLayout>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
