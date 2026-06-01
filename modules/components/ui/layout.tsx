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
      <div ref={ref} className={cn("min-h-screen w-full bg-black", className)}>
        <main className="w-full px-8 py-6">{children}</main>
      </div>
    );
  }
);
Layout.displayName = "Layout";

export { Layout };
