import * as React from "react";
import { cn } from "../lib/utils";

export interface PanelProps {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ title, actions, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-lg shadow border border-gray-200",
          className
        )}
      >
        {(title || actions) && (
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    );
  }
);
Panel.displayName = "Panel";

export { Panel };
