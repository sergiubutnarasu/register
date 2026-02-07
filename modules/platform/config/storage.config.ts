import localforage from 'localforage';

/**
 * Initialized localForage instance with application-specific configuration.
 * Uses IndexedDB as the primary storage driver, with WebSQL and localStorage
 * as fallbacks for broader browser compatibility and Safari support.
 */
const storageConfig = localforage.createInstance({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ],
  name: 'register-app',
  version: 1.0,
  storeName: 'register-data',
  description: 'Storage for register application data',
});

export default storageConfig;
