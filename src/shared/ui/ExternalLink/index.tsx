import { styled } from "@mui/material/styles";
import Link from "next/link";

export const ExternalLink = styled(Link)(() => ({
  target: "_blank",
  rel: "noopener noreferrer",
}));
