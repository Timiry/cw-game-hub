"use client";

import { Paper } from "@cw-game/react-ui";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";

const CardLayout = (props: PropsWithChildren & BoxProps) => {
  return (
    <Box
      width={{ mobile: "90%", desktop: "480px" }}
      m="160px auto 40px"
      position="relative"
    >
      <Paper elevation={8}>
        <Box p="16px" {...props} />
      </Paper>
    </Box>
  );
};

export default CardLayout;
