"use client";

import SafeHtml from "@/shared/ui/SafeHtml";
import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import termsEn from "@/shared/consts/legalDocs/termsEn";
import termsRu from "@/shared/consts/legalDocs/termsRu";
import Footer from "@/widgets/Footer";
import { Paper, Typography, Link } from "@cw-game/react-ui";
import NextLink from "next/link";
import routes from "@/shared/config/routes";

const LegalTermsPage = () => {
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
          {t("terms")}
        </Typography>
        <Paper
          component={Box}
          p={{ mobile: 1, tablet: 3 }}
          overflow="auto"
          my={3}
        >
          <SafeHtml html={locale === "ru" ? termsRu : termsEn} />
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default LegalTermsPage;
