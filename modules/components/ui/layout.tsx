import * as React from "react";
import { cn } from "../lib/utils";

export interface LayoutProps {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ title, actions, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("min-h-screen bg-gray-50", className)}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {actions && (
              <div className="flex items-center gap-2">{actions}</div>
            )}
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-8 py-6">{children}</main>
      </div>
    );
  }
);
Layout.displayName = "Layout";

export { Layout };
