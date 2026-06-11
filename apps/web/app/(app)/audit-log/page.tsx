"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { useRequirePermission } from "@/lib/persona/use-require-permission";
import { getAuditLog } from "@/services/audit";

import { EventSection, groupEventsByDay } from "./_components/event-section";
import { FilterBar } from "./_components/filter-bar";
import { TimelineSkeleton } from "../_components/timeline-skeleton";

export default function AuditLogPage() {
  const allowed = useRequirePermission("canViewAuditLog");
  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-log"],
    queryFn: getAuditLog,
  });

  const [actionFilter, setActionFilter] = React.useState("all");
  const [userFilter, setUserFilter] = React.useState("all");

  if (!allowed) return null;

  if (isLoading) {
    return <TimelineSkeleton />;
  }
  if (error) {
    return (
      <main className="p-8 text-wuko-danger-fg">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  const allEvents = data ?? [];

  const availableActions = Array.from(
    new Set(allEvents.map((e) => e.action)),
  ).sort();
  const availableUsers = Array.from(
    new Set(allEvents.map((e) => e.actor)),
  ).sort();

  const filteredEvents = allEvents.filter((event) => {
    if (actionFilter !== "all" && event.action !== actionFilter) return false;
    if (userFilter !== "all" && event.actor !== userFilter) return false;
    return true;
  });

  const groups = groupEventsByDay(filteredEvents);
  const hasFilters = actionFilter !== "all" || userFilter !== "all";

  return (
    <main className="p-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-wuko-text-muted">
            Administration
          </div>
          <h1 className="text-2xl font-semibold text-wuko-heading">
            Audit log
          </h1>
        </div>
        <span className="text-sm text-wuko-text-muted">
          {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"}
          {hasFilters && ` of ${allEvents.length}`}
        </span>
      </header>

      <FilterBar
        actionFilter={actionFilter}
        userFilter={userFilter}
        onActionChange={setActionFilter}
        onUserChange={setUserFilter}
        availableActions={availableActions}
        availableUsers={availableUsers}
      />

      {filteredEvents.length === 0 ? (
        <div className="rounded-lg border border-wuko-border bg-wuko-card p-12 text-center">
          <p className="text-sm text-wuko-text-muted">
            No events match these filters.
          </p>
        </div>
      ) : (
        <div>
          {groups.map((group) => (
            <EventSection key={group.label} group={group} />
          ))}
        </div>
      )}
    </main>
  );
}
