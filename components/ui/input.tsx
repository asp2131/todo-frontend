// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-[42px] w-full rounded bg-[#262626]",
          "border-0 px-4 py-3",
          "text-base text-white placeholder:text-zinc-600",
          "ring-offset-white transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4EA8DE]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };