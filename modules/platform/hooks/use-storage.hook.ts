import { useCallback } from "react";

export const useStorage = <T>() => {
  const getItem = useCallback((key: string): T => {
    const content = localStorage.getItem(key);

    if (!content) {
      return undefined;
    }

    return JSON.parse(content) as T;
  }, []);

  const setItem = useCallback((key: string, item: T) => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, []);

  return { getItem, setItem };
};
