import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap select-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wuko-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-wuko-accent text-wuko-bg hover:bg-wuko-accent-hover active:bg-wuko-accent-active",
        secondary:
          "bg-wuko-card text-wuko-heading border border-wuko-border hover:bg-wuko-border/40",
        outline:
          "bg-transparent text-wuko-heading border border-wuko-border hover:bg-wuko-card hover:border-wuko-text-muted",
        ghost:
          "bg-transparent text-wuko-text hover:bg-wuko-card/60 hover:text-wuko-heading",
        danger:
          "bg-wuko-danger text-white hover:bg-wuko-danger-hover",
      },
      size: {
        sm: "h-8 px-3 text-[13px] gap-1.5 rounded-md",
        md: "h-10 px-4 text-sm gap-2 rounded-md",
        lg: "h-12 px-5 text-[15px] gap-2 rounded-lg",
        "icon-xs": "size-7 rounded-md",
        "icon-sm": "size-8 rounded-md",
        icon: "size-10 rounded-md",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="3"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
