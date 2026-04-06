import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const typographyVariants = cva("", {
  variants: {
    size: {
      xsmall: "text-xs",
      small: "text-sm",
      medium: "text-base",
      large: "text-xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-gray-900",
      gray: "text-gray-500",
      red: "text-red-500",
      white: "text-white",
      indigo: "text-indigo-600",
    },
  },
  defaultVariants: {
    size: "medium",
    weight: "normal",
    color: "default",
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

const Typography = React.forwardRef<
  HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement,
  TypographyProps
>(({ as: Component = "p", size, weight, color, children, className }, ref) => {
  return (
    <Component
      ref={ref as any}
      className={cn(typographyVariants({ size, weight, color }), className)}
    >
      {children}
    </Component>
  );
});
Typography.displayName = "Typography";

export { Typography, typographyVariants };
