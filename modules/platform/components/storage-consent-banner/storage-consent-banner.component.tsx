import { Alert } from "@solness/ui";
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
      <Alert
        type="info"
        message="This application uses browser storage (IndexedDB) to save your data locally."
        onClose={handleDismiss}
      />
    </div>
  );
};

export default StorageConsentBanner;
