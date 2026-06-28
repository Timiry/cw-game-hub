"use client";

import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import privacyEn from "@/shared/consts/legalDocs/privacyEn";
import privacyRu from "@/shared/consts/legalDocs/privacyRu";
import SafeHtml from "@/shared/ui/SafeHtml";
import Footer from "@/widgets/Footer";
import { Paper, Typography, Link } from "@cw-game/react-ui";
import NextLink from "next/link";
import routes from "@/shared/config/routes";

const LegalPrivacyPage = () => {
  const t = useTranslations("LegalPage");
  const locale = useLocale();

  return (
    <>
      <Box m="80px auto" width="80%" maxWidth="1200px">
        <Typography>
          <Link component={NextLink} href={routes.legal}>
            {t("legalDocs")}
          </Link>
          {" > "}
          {t("privacy")}
        </Typography>
        <Paper
          component={Box}
          p={{ mobile: 1, tablet: 3 }}
          overflow="auto"
          my={3}
        >
          <SafeHtml html={locale === "ru" ? privacyRu : privacyEn} />
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default LegalPrivacyPage;
