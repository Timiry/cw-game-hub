"use client";

import isCloseToNewYear from "@/shared/lib/date/isCloseToNewYear";
import { Snowfall, useSnowfall } from "@hdcodedev/snowfall";
import { useEffect } from "react";

export default function SnowFall() {
  const { isEnabled, toggleSnow, updatePhysicsConfig } = useSnowfall();
  useEffect(() => {
    const snowTime = isCloseToNewYear();
    if ((snowTime && !isEnabled) || (!snowTime && isEnabled)) {
      toggleSnow();
    }
  }, [isEnabled, toggleSnow, updatePhysicsConfig]);

  return <Snowfall />;
}
