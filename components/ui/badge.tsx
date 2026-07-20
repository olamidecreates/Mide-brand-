import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-mono font-medium leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-electric text-paper",
        outline: "border border-paper/30 text-paper",
        dark: "bg-ink text-paper",
      },
      size: {
        default: "h-5 min-w-5 px-1.5 text-[10px]",
        sm: "h-4 min-w-4 px-1 text-[9px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };
