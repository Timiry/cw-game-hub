"use client";

import { createElement, useEffect } from "react";

export default function Component() {
  useEffect(() => {
    import("@zachleat/snow-fall");
  }, []);
  return createElement("snow-fall", { count: 100 });
}
