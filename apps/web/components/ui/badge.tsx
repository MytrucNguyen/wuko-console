import * as React from "react";

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type BadgeVariant =
  | "default"
  | "teal"
  | "success"
  | "warning"
  | "danger"
  | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-wuko-card text-wuko-text border-wuko-border",
  teal: "bg-wuko-accent/15 text-wuko-accent border-wuko-accent/30",
  success:
    "bg-wuko-success-fg/15 text-wuko-success-fg border-wuko-success-fg/30",
  warning:
    "bg-wuko-warning-fg/15 text-wuko-warning-fg border-wuko-warning-fg/30",
  danger:
    "bg-wuko-danger-fg/15 text-wuko-danger-fg border-wuko-danger-fg/30",
  outline: "bg-transparent text-wuko-text border-wuko-border",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
