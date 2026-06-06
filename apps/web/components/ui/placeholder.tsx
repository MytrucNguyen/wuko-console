import * as React from "react";

// Phase 3 plumbing test, replaced by real primitives from Phase 5 onward.
export interface PlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const Placeholder = React.forwardRef<
  HTMLDivElement,
  PlaceholderProps
>(({ label = "Wuko placeholder", className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      className={
        "inline-flex items-center gap-2 rounded-md border border-dashed border-wuko-border bg-wuko-card/40 px-3 py-2 text-sm text-wuko-text-muted" +
        (className ? ` ${className}` : "")
      }
      {...props}
    >
      <span aria-hidden="true">●</span>
      <span>{label}</span>
    </div>
  );
});
Placeholder.displayName = "Placeholder";
