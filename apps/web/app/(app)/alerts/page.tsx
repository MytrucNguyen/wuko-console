"use client";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import { useRequirePermission } from "@/lib/persona/use-require-permission";
import { getAlerts } from "@/services/alerts";

import { columns } from "./_components/columns";

export default function AlertsPage() {
  const allowed = useRequirePermission("canViewAlerts");
  const { data, isLoading, error } = useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
  });

  if (!allowed) return null;

  if (isLoading) {
    return (
      <main className="p-8 text-wuko-text">
        <p>Loading alerts...</p>
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

  const activeCount = data?.filter((a) => a.status === "active").length ?? 0;

  return (
    <main className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-wuko-heading">Alerts</h1>
        <p className="text-sm text-wuko-text-muted">
          {activeCount} active alert{activeCount === 1 ? "" : "s"} · {data?.length ?? 0} total
        </p>
      </header>

      <DataTable
        columns={columns}
        data={data ?? []}
        filterColumn="device_id"
        filterPlaceholder="Filter by device..."
        enableColumnVisibility
        pageSize={10}
      />
    </main>
  );
}