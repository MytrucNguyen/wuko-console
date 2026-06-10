"use client";

import { FileText } from "lucide-react";

import { useRequirePermission } from "@/lib/persona/use-require-permission";

import { EmptyState } from "../_components/empty-state";

export default function AuditLogPage() {
  const allowed = useRequirePermission("canViewAuditLog");

  if (!allowed) return null;

  return (
    <EmptyState
      icon={FileText}
      title="Audit log"
      description="Every action taken in Console will be logged here, including restarts, firmware pushes, and configuration changes."
    />
  );
}