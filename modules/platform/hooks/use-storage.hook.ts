import { useCallback } from "react";
import useFetch from "./use-fetch.hook";

export const useStorage = <T>() => {
  const { post } = useFetch();

  const getItem = useCallback((key: string): T => {
    const content = localStorage.getItem(key);

    if (!content) {
      return undefined;
    }

    return JSON.parse(content) as T;
  }, []);

  const setItem = useCallback(async (key: string, item: T) => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(item));
      await post("/api/data", item);
    }
  }, []);

  return { getItem, setItem };
};
