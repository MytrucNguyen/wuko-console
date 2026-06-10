import { LayoutGrid, Bell, FileText, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { PersonaConfig } from "@/lib/persona/use-persona";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  requiresPermission?: keyof PersonaConfig["permissions"];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Fleet",
    href: "/fleet",
    icon: LayoutGrid,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
    requiresPermission: "canViewAlerts",
  },
  {
    label: "Audit log",
    href: "/audit-log",
    icon: FileText,
    requiresPermission: "canViewAuditLog",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    requiresPermission: "canViewSettings",
  },
];