"use client";

import { useRouter } from "@/shared/i18n/navigation";
import Image from "next/image";
import LanguageSwitch from "../LangToggleButtonGroup";
import { StyledHeader } from "./styles";
import { Box } from "@mui/material";
import routes from "@/shared/config/routes";

export default function Header() {
  const router = useRouter();

  return (
    <StyledHeader>
      <Box
        onClick={() => router.push(routes.main)}
        sx={{
          cursor: "pointer",
        }}
      >
        <Image src="/logo.svg" alt="CW Game logo" width={120} height={40} />
      </Box>
      <LanguageSwitch />
    </StyledHeader>
  );
}
