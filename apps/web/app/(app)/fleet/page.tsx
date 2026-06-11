"use client";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import { usePersona } from "@/lib/persona/use-persona";
import { getDevices } from "@/services/devices";

import { columns } from "./_components/columns";
import { TableSkeleton } from "../_components/table-skeleton";

export default function FleetPage() {
  const persona = usePersona();
  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });

  if (isLoading) {
    return <TableSkeleton columnCount={8} />;
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
      <header className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-wuko-heading">
            Fleet Overview
          </h1>
          <p className="text-sm text-wuko-text-muted">
            {data?.length ?? 0} device{data?.length === 1 ? "" : "s"} · Viewing
            as {persona.label}
          </p>
        </div>
      </header>

      <DataTable
        columns={columns}
        data={data ?? []}
        filterColumn="region"
        filterPlaceholder="Filter by region..."
        enableColumnVisibility
        pageSize={10}
      />
    </main>
  );
}
