"use client";

import { Settings } from "lucide-react";

import { useRequirePermission } from "@/lib/persona/use-require-permission";

import { EmptyState } from "../_components/empty-state";

export default function SettingsPage() {
  const allowed = useRequirePermission("canViewSettings");

  if (!allowed) return null;

  return (
    <EmptyState
      icon={Settings}
      title="Settings"
      description="Configure regions, user roles, alert thresholds, and integration credentials."
    />
  );
}