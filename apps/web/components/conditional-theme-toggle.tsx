"use client";

import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";

const APP_ROUTES = ["/fleet", "/alerts", "/audit-log", "/settings"];

export function ConditionalThemeToggle() {
  const pathname = usePathname();
  const isAppRoute = APP_ROUTES.some((route) => pathname.startsWith(route));

  if (isAppRoute) return null;

  return (
    <div className="absolute top-4 right-4 z-10">
      <ThemeToggle />
    </div>
  );
}