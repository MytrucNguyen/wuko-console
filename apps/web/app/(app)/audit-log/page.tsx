"use client";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import { useRequirePermission } from "@/lib/persona/use-require-permission";
import { getAuditLog } from "@/services/audit";

import { columns } from "./_components/columns";

export default function AuditLogPage() {
  const allowed = useRequirePermission("canViewAuditLog");
  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-log"],
    queryFn: getAuditLog,
  });

  if (!allowed) return null;

  if (isLoading) {
    return (
      <main className="p-8 text-wuko-text">
        <p>Loading audit log...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8 text-wuko-danger-fg">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-wuko-heading">
          Audit log
        </h1>
        <p className="text-sm text-wuko-text-muted">
          {data?.length ?? 0} event{data?.length === 1 ? "" : "s"} recorded
        </p>
      </header>

      <DataTable
        columns={columns}
        data={data ?? []}
        filterColumn="actor"
        filterPlaceholder="Filter by actor..."
        enableColumnVisibility
        pageSize={10}
      />
    </main>
  );
}