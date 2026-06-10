"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePersona } from "@/lib/persona/use-persona";
import { acknowledgeAlert, dismissAlert } from "@/services/alerts";
import type { Alert } from "@/types/alerts";

function SeverityBadge({ severity }: { severity: Alert["severity"] }) {
  const colors = {
    critical: "bg-wuko-danger-fg/15 text-wuko-danger-fg",
    warning: "bg-wuko-warning-fg/15 text-wuko-warning-fg",
    info: "bg-wuko-text-muted/15 text-wuko-text-muted",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${colors[severity]}`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: Alert["status"] }) {
  const colors = {
    active: "bg-wuko-accent/15 text-wuko-accent",
    acknowledged: "bg-wuko-text-muted/15 text-wuko-text-muted",
    dismissed: "bg-wuko-card text-wuko-text-muted",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return `${Math.floor(diffMins / 1440)}d ago`;
}

function RowActions({ alert }: { alert: Alert }) {
  const persona = usePersona();
  const queryClient = useQueryClient();

  const ackMutation = useMutation({
    mutationFn: () => acknowledgeAlert(alert.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
  });

  const dismissMutation = useMutation({
    mutationFn: () => dismissAlert(alert.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
  });

  if (!persona.permissions.canViewAlerts) return null;
  if (alert.status !== "active") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open actions menu">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => ackMutation.mutate()}>
          Acknowledge
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => dismissMutation.mutate()}
        >
          Dismiss
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Alert>[] = [
  {
    accessorKey: "severity",
    header: ({ column }) => (
      <SortableHeader column={column}>Severity</SortableHeader>
    ),
    cell: ({ row }) => <SeverityBadge severity={row.original.severity} />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader column={column}>Alert</SortableHeader>
    ),
  },
  {
    accessorKey: "device_id",
    header: ({ column }) => (
      <SortableHeader column={column}>Device</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.device_id}</span>
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <SortableHeader column={column}>Region</SortableHeader>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <SortableHeader column={column}>Created</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="text-wuko-text-muted">
        {formatTimestamp(row.original.created_at)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions alert={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];