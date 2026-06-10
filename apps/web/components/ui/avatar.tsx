"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "offline";

export interface AvatarProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    "children" | "size"
  > {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

const sizeClasses: Record<
  AvatarSize,
  { root: string; fallback: string; dot: string }
> = {
  sm: { root: "size-7", fallback: "text-[11px]", dot: "size-2" },
  md: { root: "size-10", fallback: "text-sm", dot: "size-2.5" },
  lg: { root: "size-14", fallback: "text-base", dot: "size-3" },
};

// Away dot pinned to dark-mode #f59e0b (wuko-warning-fg dark value) so it stays
// vibrant in both themes; role-token's light-mode amber-800 ramp reads as
// "warning brown" rather than "user away". See the
// status-indicator-fixed-hue-pin-to-dark-token-value rule.
const statusColors: Record<AvatarStatus, string> = {
  online: "bg-wuko-success-fg",
  away: "bg-[#f59e0b]",
  offline: "bg-wuko-text-muted",
};

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", status, className, ...rest }, ref) => {
    const sz = sizeClasses[size];
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative inline-flex shrink-0", className)}
        {...rest}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center overflow-hidden rounded-full",
            "bg-wuko-border ring-2 ring-wuko-bg",
            sz.root
          )}
        >
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="size-full object-cover"
          />
          <AvatarPrimitive.Fallback
            className={cn(
              "inline-flex size-full items-center justify-center font-semibold text-wuko-heading",
              sz.fallback
            )}
          >
            {fallback || "?"}
          </AvatarPrimitive.Fallback>
        </span>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-wuko-bg",
              sz.dot,
              statusColors[status]
            )}
            aria-label={status}
          />
        )}
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";
