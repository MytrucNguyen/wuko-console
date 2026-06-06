import * as React from "react";

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    // Translucent over the page in dark; solid in light (/70 over #ffffff washes out).
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-wuko-border bg-wuko-card/70 p-5 light:bg-wuko-card",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
