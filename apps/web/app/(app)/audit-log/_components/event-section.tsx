"use client";

import type { AuditEvent } from "@/types/audit";

import { EventRow } from "./event-row";

export type EventGroup = {
  label: string;
  events: AuditEvent[];
};

export function groupEventsByDay(events: AuditEvent[]): EventGroup[] {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  const buckets = new Map<string, AuditEvent[]>();

  for (const event of events) {
    const eventTime = new Date(event.timestamp).getTime();
    const daysAgo = Math.floor((now - eventTime) / oneDay);

    let label: string;
    if (daysAgo === 0) label = "Today";
    else if (daysAgo === 1) label = "Yesterday";
    else label = `${daysAgo} days ago`;

    const existing = buckets.get(label) ?? [];
    existing.push(event);
    buckets.set(label, existing);
  }

  return Array.from(buckets.entries()).map(([label, events]) => ({
    label,
    events,
  }));
}

export function EventSection({ group }: { group: EventGroup }) {
  return (
    <section className="mb-4 overflow-hidden rounded-lg border border-wuko-border bg-wuko-card">
      <header className="flex items-baseline gap-3 border-b border-wuko-border px-4 py-2.5">
        <h2 className="text-[11px] font-semibold tracking-wider text-wuko-heading">
          {group.label}
        </h2>
        <span className="text-xs text-wuko-text-muted">
          {group.events.length} event{group.events.length === 1 ? "" : "s"}
        </span>
      </header>
      <div className="px-4">
        {group.events.map((event) => (
          <EventRow key={event.event_id} event={event} />
        ))}
      </div>
    </section>
  );
}