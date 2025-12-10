import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Сервер: новый клиент для каждого запроса
    return makeQueryClient();
  } else {
    // Клиент: singleton
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
