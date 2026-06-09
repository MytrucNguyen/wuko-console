import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  [
    "w-full bg-wuko-card text-wuko-heading placeholder:text-wuko-text-muted",
    "border border-wuko-border outline-none transition-colors",
    "focus-visible:border-wuko-accent focus-visible:ring-2 focus-visible:ring-wuko-accent/30",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "aria-invalid:border-wuko-danger-fg",
    "aria-invalid:focus-visible:border-wuko-danger-fg aria-invalid:focus-visible:ring-wuko-danger-fg/30",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 text-[13px] px-2.5 rounded-md",
        md: "h-10 text-sm px-3 rounded-md",
        lg: "h-12 text-[15px] px-4 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type InputSize = NonNullable<
  VariantProps<typeof inputVariants>["size"]
>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size = "md",
      leftIcon,
      rightIcon,
      className,
      id,
      type = "text",
      disabled,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id ?? `wuko-input-${reactId}`;
    const messageId = hint || error ? `${inputId}-msg` : undefined;
    const describedBy = cn(ariaDescribedBy, messageId) || undefined;

    const iconPaddingLeft = leftIcon
      ? size === "lg"
        ? "pl-10"
        : "pl-9"
      : undefined;
    const iconPaddingRight = rightIcon
      ? size === "lg"
        ? "pr-10"
        : "pr-9"
      : undefined;

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-[13px] font-medium text-wuko-heading"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-wuko-text-muted">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              inputVariants({ size }),
              iconPaddingLeft,
              iconPaddingRight
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-wuko-text-muted">
              {rightIcon}
            </span>
          )}
        </div>
        {(hint || error) && (
          <p
            id={messageId}
            className={cn(
              "mt-1.5 text-[12px]",
              error ? "text-wuko-danger-fg" : "text-wuko-text-muted"
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { inputVariants };
