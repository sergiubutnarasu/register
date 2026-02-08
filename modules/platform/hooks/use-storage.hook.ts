import { useCallback } from "react";
import storageConfig from "../config/storage.config";

export const useStorage = <T>() => {
  const getItem = useCallback(
    async (key: string): Promise<T | undefined> => {
      try {
        const content = await storageConfig.getItem(key);

        if (content === null) {
          return undefined;
        }

        return content as T;
      } catch (error) {
        console.error(`Failed to retrieve item from storage with key "${key}":`, error);
        throw error;
      }
    },
    []
  );

  const setItem = useCallback(
    async (key: string, item: T): Promise<void> => {
      try {
        if (key) {
          await storageConfig.setItem(key, item);
        }
      } catch (error) {
        console.error(
          `Failed to set item in storage with key "${key}":`,
          error
        );
        throw error;
      }
    },
    []
  );

  return { getItem, setItem };
};
