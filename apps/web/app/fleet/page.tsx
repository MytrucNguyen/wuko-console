"use client";

import { getDevices } from "@/services/devices";
import { useQuery } from "@tanstack/react-query";

export default function FleetPage() {
const { data, isLoading, error } = useQuery({
  queryKey: ["devices"],
  queryFn: getDevices,
});

  if (isLoading) return <main className="p-8 text-wuko-text">Loading...</main>;
  if (error) return <main className="p-8 text-wuko-danger-fg">Error: {error.message}</main>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold text-wuko-heading mb-6">Fleet Overview</h1>
      <pre className="text-xs text-wuko-text-muted">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}