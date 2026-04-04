import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useStorage } from "../../hooks";

export interface Props {
  storageKey?: string;
}

const StorageConsentBanner: FunctionComponent<Props> = ({
  storageKey = "storage-consent-dismissed",
}) => {
  const { getItem, setItem } = useStorage<boolean>();
  const [isDismissed, setIsDismissed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if banner was previously dismissed
  useEffect(() => {
    const checkDismissed = async () => {
      try {
        const dismissed = await getItem(storageKey);
        setIsDismissed(dismissed ?? false);
      } catch (error) {
        console.error("Failed to check consent banner state:", error);
        setIsDismissed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkDismissed();
  }, [getItem, storageKey]);

  const handleDismiss = useCallback(async () => {
    try {
      await setItem(storageKey, true);
      setIsDismissed(true);
    } catch (error) {
      console.error("Failed to save consent banner state:", error);
    }
  }, [setItem, storageKey]);

  // Don't render while checking storage or if dismissed
  if (isLoading || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-[calc(100%-2rem)] sm:w-auto">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3 pr-10 relative shadow-lg">
        <p className="text-sm text-blue-700">
          This application uses browser storage (IndexedDB) to save your data locally.
        </p>
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:text-blue-700 hover:bg-blue-200/50 transition-colors"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StorageConsentBanner;
