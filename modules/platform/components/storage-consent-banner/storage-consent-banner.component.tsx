import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useStorage } from "../../hooks";

export interface Props {
  storageKey?: string;
}

const StorageConsentBanner: FunctionComponent<Props> = ({
  storageKey = "app-notice-seen",
}) => {
  const { getItem, setItem } = useStorage<boolean>();
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check if notice was previously acknowledged
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const seen = await getItem(storageKey);
        // Show banner by default (when seen is null/undefined)
        setIsVisible(!(seen ?? false));
      } catch (error) {
        console.error("Failed to check notice state:", error);
        // Default to visible on error
        setIsVisible(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
  }, [getItem, storageKey]);

  const handleClose = useCallback(async () => {
    try {
      await setItem(storageKey, true);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to save notice state:", error);
    }
  }, [setItem, storageKey]);

  const handleToggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // Don't render while checking storage
  if (isChecking) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Banner - shown when visible */}
      {isVisible && (
        <div
          className="max-w-md"
          data-notice="local-data-info"
        >
          <div className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 pr-10 relative shadow-md">
            <p className="text-sm text-slate-700 leading-relaxed">
              Datele sunt salvate local în browser pentru acces offline.
            </p>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition"
              aria-label="Închide"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button - always visible */}
      <button
        onClick={handleToggle}
        className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-slate-700 active:bg-slate-900 transition flex items-center gap-2 text-sm font-medium"
        aria-label={isVisible ? "Ascunde informațiile despre date" : "Afișează informațiile despre date"}
        title="Afișează/ascunde informații despre date"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>Date salvate</span>
      </button>
    </div>
  );
};

export default StorageConsentBanner;
