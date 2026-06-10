"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { Device } from "@/types/devices";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: "bg-wuko-success-fg/15 text-wuko-success-fg",
    updating: "bg-wuko-warning-fg/15 text-wuko-warning-fg",
    offline: "bg-wuko-text-muted/15 text-wuko-text-muted",
    degraded: "bg-wuko-danger-fg/15 text-wuko-danger-fg",
  };
  const className = colors[status] ?? "bg-wuko-card text-wuko-text";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}

function RowActions({ device }: { device: Device }) {
  const persona = usePersona();
  const canRestart = persona.permissions.canRestartDevice;
  const canUpdate = persona.permissions.canUpdateFirmware;
  const hasAnyAction = canRestart || canUpdate;

  if (!hasAnyAction) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open actions menu">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(device.id)}
        >
          Copy device ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {canRestart && <DropdownMenuItem>Restart device</DropdownMenuItem>}
        {canUpdate && <DropdownMenuItem>Update firmware</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Device>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column}>Device</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <SortableHeader column={column}>Region</SortableHeader>
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
    accessorKey: "firmware_version",
    header: ({ column }) => (
      <SortableHeader column={column}>Firmware</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.firmware_version}</span>
    ),
  },
  {
    accessorKey: "store",
    header: ({ column }) => (
      <SortableHeader column={column}>Store</SortableHeader>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions device={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
