export const isClient = typeof window !== 'undefined';

export const getFromLocalStorage = (key: string): string | null => {
  if (!isClient) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setToLocalStorage = (key: string, value: string): void => {
  if (!isClient) return;
  try {
    localStorage.setItem(key, value);
  } catch {}
};