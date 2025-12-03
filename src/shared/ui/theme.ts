"use client"

import { createTheme } from "@mui/material";

const theme = createTheme({
  "palette": {
    "mode": "dark",
    "hub": {
      "primary": {
        "light": "#405453",
        "main": "#4b6362",
        "dark": "#394f4d",
        "contrastText": "#c0d8d7"
      },
      "secondary": {
        "light": "#2c373f",
        "main": "#242d33",
        "dark": "#1f282d",
        "contrastText": "#c0d8d7"
      },
      "text": {
        "primary": "#c0d8d7",
        "secondary": "#7c9c9b",
        "disabled": "#5a6b6b"
      },
      "background": {
        "paper": "rgb(31, 40, 46)",
        "default": "rgb(22, 29, 33)"
      }
    },
    "play": {
      "primary": {
        "light": "rgba(0, 0, 0, 0.2)",
        "main": "rgba(0, 0, 0, 0.4)",
        "dark": "rgba(0, 0, 0, 0.6)",
        "contrastText": "rgba(255, 255, 255, 0.7)"
      },
      "secondary": {
        "light": "rgba(255, 255, 255, 0.2)",
        "main": "rgba(255, 255, 255, 0.08)",
        "dark": "rgba(255, 255, 255, 0.02)",
        "contrastText": "rgba(255, 255, 255, 0.7)"
      },
      "text": {
        "primary": "rgba(255, 255, 255, 0.7)",
        "secondary": "rgba(255, 255, 255, 0.4)",
        "disabled": "rgba(255, 255, 255, 0.2)"
      },
      "background": {
        "paper": "rgba(0, 0, 0, 0.6)",
        "default": "rgba(0, 0, 0, 0.6)"
      }
    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 550,
      desktop: 940,
    },
  },
  typography: {
    fontFamily: ["Neucha"].join(","),
    console: {
      fontSize: "0.8rem",
      fontFamily: "monospace",
    },
  },
});

export default theme;
