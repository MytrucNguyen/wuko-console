"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-sm border border-wuko-border bg-wuko-card ring-offset-wuko-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuko-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-wuko-accent data-[state=checked]:bg-wuko-accent data-[state=checked]:text-wuko-bg data-[state=indeterminate]:border-wuko-accent data-[state=indeterminate]:bg-wuko-accent data-[state=indeterminate]:text-wuko-bg aria-invalid:border-wuko-danger aria-invalid:focus-visible:ring-wuko-danger transition-colors",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {props.checked === "indeterminate" ? (
        <Minus className="size-3.5" strokeWidth={3} />
      ) : (
        <Check className="size-3.5" strokeWidth={3} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
