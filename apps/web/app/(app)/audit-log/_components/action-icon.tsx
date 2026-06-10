"use client";

import {
  Bell,
  LogIn,
  RefreshCw,
  Settings,
  Shield,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "session.login": LogIn,
  "alert.acknowledge": Bell,
  "device.restart": RefreshCw,
  "firmware.update": Settings,
  "firmware.rollback": Settings,
  "user.role.change": User,
  "policy.update": Shield,
};

export function ActionIcon({ action }: { action: string }) {
  const Icon = ICON_MAP[action] ?? Settings;
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-wuko-card">
      <Icon className="size-3.5 text-wuko-text-muted" />
    </div>
  );
}