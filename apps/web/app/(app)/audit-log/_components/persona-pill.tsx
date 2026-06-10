import { Eye, Shield, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AuditEvent } from "@/types/audit";

const PERSONA_META: Record<
  AuditEvent["actor_role"],
  { icon: LucideIcon; color: string }
> = {
  admin: { icon: Shield, color: "text-wuko-accent" },
  operator: { icon: Wrench, color: "text-wuko-warning-fg" },
  viewer: { icon: Eye, color: "text-wuko-text-muted" },
};

export function PersonaPill({ role }: { role: AuditEvent["actor_role"] }) {
  const meta = PERSONA_META[role];
  const Icon = meta.icon;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-wuko-border bg-wuko-card/40 px-1.5 py-0.5 text-[10px] font-medium">
      <Icon className={`size-3 ${meta.color}`} />
      <span className="text-wuko-text">{role}</span>
    </span>
  );
}