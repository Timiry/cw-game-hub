"use client";

import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import privacyEn from "@/shared/consts/legalDocs/privacyEn";
import privacyRu from "@/shared/consts/legalDocs/privacyRu";
import SafeHtml from "@/shared/ui/SafeHtml";
import Footer from "@/widgets/Footer";
import { Paper, Button } from "@cw-game/react-ui";
import { useRouter } from "@/shared/i18n/navigation";
import routes from "@/shared/config/routes";

const LegalPrivacyPage = () => {
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
          <SafeHtml html={locale === "ru" ? privacyRu : privacyEn} />
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

export default LegalPrivacyPage;
