"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/ui/data-table";
import type { AuditEvent } from "@/types/audit";

function OutcomeBadge({ outcome }: { outcome: AuditEvent["outcome"] }) {
  const colors = {
    success: "bg-wuko-success-fg/15 text-wuko-success-fg",
    failed: "bg-wuko-danger-fg/15 text-wuko-danger-fg",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[outcome]}`}
    >
      {outcome}
    </span>
  );
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return `${Math.floor(diffMins / 1440)}d ago`;
}

export const columns: ColumnDef<AuditEvent>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <SortableHeader column={column}>Time</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="text-wuko-text-muted">
        {formatTimestamp(row.original.timestamp)}
      </span>
    ),
  },
  {
    accessorKey: "actor",
    header: ({ column }) => (
      <SortableHeader column={column}>Actor</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.actor}</span>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <SortableHeader column={column}>Action</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.action}</span>
    ),
  },
  {
    accessorKey: "target",
    header: ({ column }) => (
      <SortableHeader column={column}>Target</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.target}</span>
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <SortableHeader column={column}>Region</SortableHeader>
    ),
  },
  {
    accessorKey: "outcome",
    header: ({ column }) => (
      <SortableHeader column={column}>Outcome</SortableHeader>
    ),
    cell: ({ row }) => <OutcomeBadge outcome={row.original.outcome} />,
  },
];