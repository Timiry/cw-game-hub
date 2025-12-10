"use client";

import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getQueryClient } from "./query-client";

export function QueryProvider(props: PropsWithChildren) {
  const [queryClient] = useState(() => getQueryClient());

  return <QueryClientProvider client={queryClient} {...props} />;
}
