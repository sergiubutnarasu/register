import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        indigo: "bg-violet-600 text-white hover:bg-violet-700",
        gray: "bg-gray-500 text-white hover:bg-gray-600",
        transparent: "bg-transparent text-gray-600 hover:bg-gray-100",
        red: "bg-red-600 text-white hover:bg-red-700",
        teal: "bg-teal-600 text-white hover:bg-teal-700",
        white: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
      },
      size: {
        xsmall: "px-2 py-1 text-xs rounded h-7",
        small: "px-3 py-1.5 text-sm rounded h-9",
        medium: "px-4 py-2 text-base rounded-md h-10",
        large: "px-6 py-3 text-lg rounded-lg h-12",
      },
    },
    defaultVariants: {
      variant: "indigo",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  title?: string;
  loading?: boolean;
  asChild?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  transparent?: boolean;
  iconColor?: string;
  color?: "indigo" | "gray" | "transparent" | "red" | "teal" | "white";
}

export type IconType = string;
export type SizeType = "xsmall" | "small" | "medium" | "large";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, title, loading, disabled, asChild = false, icon, iconPosition = "left", transparent, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Handle color prop (from @solness/ui) as alias for variant
    const colorVariant = color || variant;
    
    // Handle transparent boolean prop
    const finalVariant = transparent ? "transparent" : colorVariant;
    
    const renderIcon = () => {
      if (!icon) return null;
      // Only add margins if there are children or title
      const hasContent = Boolean(children || title);
      const iconClass = cn("h-4 w-4", hasContent && iconPosition === "left" ? "mr-2" : hasContent && iconPosition === "right" ? "ml-2" : "");
      
      const icons: Record<string, React.ReactNode> = {
        plus: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ),
        trash: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        ),
        edit: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
        download: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
        calendar: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
        close: (
          <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ),
      };
      
      return icons[icon] || null;
    };

    // Check if this is an icon-only button
    const isIconOnly = icon && !children && !title;
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant: finalVariant, size, className }),
          isIconOnly && "px-3"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {title || children}
          </span>
        ) : (
          <span className="flex items-center justify-center">
            {icon && iconPosition === "left" && renderIcon()}
            {(title || children) && <span>{title || children}</span>}
            {icon && iconPosition === "right" && renderIcon()}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
