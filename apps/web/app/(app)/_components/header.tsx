"use client";

import { usePathname } from "next/navigation";
import Mascot from "@/components/brand/mascot";
import { ThemeToggle } from "@/components/theme-toggle";

import { HealthChip } from "./health-chip";
import { ProfileMenu } from "./profile-menu";

const PAGE_NAMES: Record<string, string> = {
  "/fleet": "Fleet",
  "/alerts": "Alerts",
  "/audit-log": "Audit log",
  "/settings": "Settings",
};

function EnvironmentChip() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "local";

  const colors: Record<string, string> = {
    local: "bg-wuko-card text-wuko-text-muted border-wuko-border",
    staging: "bg-wuko-warning-fg/15 text-wuko-warning-fg border-wuko-warning-fg/30",
    production: "bg-wuko-danger-fg/15 text-wuko-danger-fg border-wuko-danger-fg/30",
  };
  const className = colors[env] ?? colors.local;

  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${className}`}
    >
      {env}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const pageName = PAGE_NAMES[pathname] ?? "Console";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-wuko-border bg-wuko-bg px-4">
      <div className="flex items-center gap-2.5">
        <div className="size-7">
          <Mascot />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-wuko-heading">Wuko</span>
          <span className="text-sm text-wuko-text-muted">Console</span>
        </div>
        <EnvironmentChip />
      </div>

      <div className="h-5 w-px bg-wuko-border" />

      <span className="font-mono text-xs text-wuko-text-muted">
        {pageName.toLowerCase()}
      </span>

      <div className="ml-auto flex items-center gap-3">
        <HealthChip />
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}