"use client";

import { Link, Typography } from "@cw-game/react-ui";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import routes from "@/shared/config/routes";
import { List, ListItem } from "@mui/material";
import Footer from "@/widgets/Footer";

const LegalPage = () => {
  const t = useTranslations("LegalPage");
  return (
    <Box display="flex" flexDirection="column" sx={{}} height="100vh">
      <Box m="80px auto" width="80%" maxWidth="1200px" flex={1}>
        <Typography variant="h4">{t("legalDocs")}</Typography>
        <List>
          <ListItem>
            <Link component={NextLink} href={routes.legalTerms}>
              {t("terms")}
            </Link>
          </ListItem>
          <ListItem>
            <Link component={NextLink} href={routes.legalPrivacy}>
              {t("privacy")}
            </Link>
          </ListItem>
        </List>
      </Box>
      <Footer />
    </Box>
  );
};

export default LegalPage;
