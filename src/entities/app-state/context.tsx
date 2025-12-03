'use client';

import { PropsWithChildren } from "react";
import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { AppState } from './model';

export type AppStore = {
  appState: AppState;
} | null;

const StoreContext = createContext<AppStore | null>(null);

export const StoreProvider = (props: PropsWithChildren) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const appState = new AppState();
    setStore({ appState });
  }, []);

  return (
    <StoreContext.Provider value={store} {...props} />
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export const useSnackbar = () => {
  const store = useStore();
  if (store) return [
    store.appState.openSnackbar.bind(store.appState),
    store.appState.closeSnackbar.bind(store.appState)
  ] as const;
};