"use client";

import { useLayoutEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { StyledLoader } from "./styles";

interface TelegramLoginButtonProps {
  onLogin: (data: unknown) => void;
}

const TelegramLoginButton = ({ onLogin }: TelegramLoginButtonProps) => {
  const [isTelegramWidgetLoaded, setTelegramWidgetLoaded] = useState(false);
  const telegramWrapperRef = useRef<null | HTMLDivElement>(null);

  const handleLoad = () => setTelegramWidgetLoaded(true);

  useLayoutEffect(() => {
    window.onTelegramAuth = onLogin;
  });

  useLayoutEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://telegram.org/js/telegram-widget.js?22";
    scriptElement.setAttribute("data-telegram-login", "cwgame_bot");
    scriptElement.setAttribute("data-size", "medium");
    scriptElement.setAttribute("data-userpic", "false");
    scriptElement.setAttribute("data-onauth", "onTelegramAuth(user)");
    scriptElement.async = true;
    scriptElement.addEventListener("load", handleLoad);
    telegramWrapperRef.current?.appendChild(scriptElement);
    return () => {
      scriptElement.remove();
      scriptElement.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Box
      ref={telegramWrapperRef}
      borderRadius="20px"
      height="40px"
      width="204px"
      boxShadow={theme => theme.shadows[3]}
      bgcolor="#54a9eb"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!isTelegramWidgetLoaded && <StyledLoader thickness={4} size="24px" />}
    </Box>
  );
};

export default TelegramLoginButton;

declare global {
  interface Window {
    onTelegramAuth: (data: unknown) => void;
  }
}
