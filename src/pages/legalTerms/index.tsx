"use client";

import SafeHtml from "@/shared/ui/SafeHtml";
import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import termsEn from "@/shared/consts/legalDocs/termsEn";
import termsRu from "@/shared/consts/legalDocs/termsRu";
import Footer from "@/widgets/Footer";
import { Paper, Button } from "@cw-game/react-ui";
import routes from "@/shared/config/routes";
import { useRouter } from "@/shared/i18n/navigation";

const LegalTermsPage = () => {
  const t = useTranslations("LegalPage");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <Box m="80px auto" width="80%" maxWidth="1200px">
        <Paper
          component={Box}
          p={{ mobile: 1, tablet: 3 }}
          overflow="auto"
          mb={3}
        >
          <SafeHtml html={locale === "ru" ? termsRu : termsEn} />
        </Paper>
        <Button
          variant="outlined"
          onClick={() => router.push(routes.legal)}
          sx={{
            display: "block",
            margin: {
              mobile: "0 auto",
              desktop: "0",
            },
          }}
        >
          {t("toLegalDocsButton")}
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default LegalTermsPage;
