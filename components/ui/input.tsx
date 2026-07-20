import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-14 w-full rounded-full border border-paper/20 bg-paper/5 px-6 font-body text-sm text-paper placeholder:text-steel backdrop-blur-sm transition-colors duration-300 focus-visible:border-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
