'use client';

import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { AppState } from './model';

export type AppStore = {
  appState: AppState;
} | null;

const StoreContext = createContext<AppStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    // 🚀 Инициализируем ТОЛЬКО после гидратации
    const appState = new AppState();
    setStore({ appState });
  }, []);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

// export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   // ✅ Создаём store только на клиенте при первом рендере
//   const store = createStore();

//   return (
//     <StoreContext.Provider value={{ appState: store }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

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