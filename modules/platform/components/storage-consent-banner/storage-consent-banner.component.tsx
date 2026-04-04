import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useStorage } from "../../hooks";

export interface Props {
  storageKey?: string;
}

const StorageConsentBanner: FunctionComponent<Props> = ({
  storageKey = "app-notice-seen",
}) => {
  const { getItem, setItem } = useStorage<boolean>();
  const [isHidden, setIsHidden] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check if notice was previously acknowledged
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const seen = await getItem(storageKey);
        setIsHidden(seen ?? false);
      } catch (error) {
        console.error("Failed to check notice state:", error);
        setIsHidden(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
  }, [getItem, storageKey]);

  const handleClose = useCallback(async () => {
    try {
      await setItem(storageKey, true);
      setIsHidden(true);
    } catch (error) {
      console.error("Failed to save notice state:", error);
    }
  }, [setItem, storageKey]);

  // Don't show while loading or if already closed
  if (isChecking || isHidden) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 max-w-md"
      data-notice="local-data-info"
    >
      <div className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 pr-10 relative shadow-md">
        <p className="text-sm text-slate-700 leading-relaxed">
          Your data is saved locally in your browser for offline access.
        </p>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StorageConsentBanner;
