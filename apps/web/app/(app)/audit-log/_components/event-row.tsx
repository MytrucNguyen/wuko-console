"use client";

import type { AuditEvent } from "@/types/audit";

import { ActionIcon } from "./action-icon";
import { DiffBlock } from "./diff-block";
import { PersonaPill } from "./persona-pill";

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const hours = Math.floor(diffMins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function EventRow({ event }: { event: AuditEvent }) {
  const hasDiff = event.before !== undefined && event.after !== undefined;

  return (
    <div className="border-b border-wuko-border/50 py-4">
      <div className="flex items-start gap-4">
        <div className="w-20 shrink-0">
          <div className="text-sm text-wuko-text">
            {formatRelativeTime(event.timestamp)}
          </div>
          <div className="font-mono text-[10px] text-wuko-text-muted">
            {event.event_id}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <ActionIcon action={event.action} />
            <span className="font-mono text-wuko-heading">{event.actor}</span>
            <PersonaPill role={event.actor_role} />
            <span className="text-wuko-text-muted">performed</span>
            <span className="rounded bg-wuko-card px-1.5 py-0.5 font-mono text-xs text-wuko-text">
              {event.action}
            </span>
            <span className="text-wuko-text-muted">on</span>
            <span className="font-mono text-wuko-accent">{event.target}</span>
          </div>
          {hasDiff && (
            <DiffBlock before={event.before!} after={event.after!} />
          )}
        </div>
      </div>
    </div>
  );
}