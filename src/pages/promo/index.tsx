"use client";

import routes from "@/shared/config/routes";
import Footer from "@/widgets/Footer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CoveredSection, DescriptionContainer } from "./styles";
import ExternalLink from "@/shared/ui/ExternalLink";

const PromoPage = observer(() => {
  const t = useTranslations("PromoPage");
  const router = useRouter();

  return (
    <Box>
      <CoveredSection>
        <DescriptionContainer>
          <Typography variant="h2">{t("title")}</Typography>
          <Typography variant="h5" gutterBottom>
            {t("description")}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push(routes.serverList)}
          >
            <Typography variant="h5">{t("playButton")}</Typography>
          </Button>
        </DescriptionContainer>
        <Box position="absolute" right="30px" bottom="20px">
          <ExternalLink href="https://t.me/undead_fuga_art">
            <Typography variant="h6">designed by undead_fuga</Typography>
          </ExternalLink>
        </Box>
      </CoveredSection>
      <Box textAlign="center" my="50px">
        <Typography variant="h3" gutterBottom>
          {t("gameplay")}
        </Typography>
        <iframe
          src="https://vkvideo.ru/video_ext.php?oid=-197666536&id=456239031&hash=6324a54fb7d1713f&hd=3"
          width="80%"
          style={{ aspectRatio: "16 / 9" }}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Box>
      <Footer />
    </Box>
  );
});

export default PromoPage;
