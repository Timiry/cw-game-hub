"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { AppState } from "./model";

const store = new AppState();
const StoreContext = createContext(store);

export const StoreProvider = (props: PropsWithChildren) => {
  return <StoreContext.Provider value={store} {...props} />;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export const useSnackbar = () => {
  const store = useStore();
  return [
    store.openSnackbar.bind(store),
    store.closeSnackbar.bind(store),
  ] as const;
};
