import storageConfig from '../config/storage.config';

/**
 * Migrates existing localStorage data to IndexedDB.
 * Checks if data exists in localStorage, reads it, writes to IndexedDB,
 * and then removes it from localStorage.
 *
 * @param key The storage key to migrate
 * @returns Promise<boolean> - true if migration completed, false if no data or error
 */
export const migrateFromLocalStorage = async (
  key: string
): Promise<boolean> => {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return false;
    }

    const parsedData = JSON.parse(data);
    await storageConfig.setItem(key, parsedData);
    localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.error(`Migration failed for key "${key}":`, error);
    return false;
  }
};
