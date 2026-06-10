"use client";

import { useQuery } from "@tanstack/react-query";

import { getDevices } from "@/services/devices";

export function HealthChip() {
  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });

  if (!data || data.length === 0) {
    return null;
  }

  const offlineCount = data.filter((d) => d.status === "offline").length;
  const degradedCount = data.filter((d) => d.status === "degraded").length;

  let status: "nominal" | "degraded" | "critical";
  let label: string;

  if (offlineCount > 0) {
    status = "critical";
    label = `${offlineCount} device${offlineCount === 1 ? "" : "s"} offline`;
  } else if (degradedCount > 0) {
    status = "degraded";
    label = `${degradedCount} device${degradedCount === 1 ? "" : "s"} degraded`;
  } else {
    status = "nominal";
    label = "All regions nominal";
  }

  const colors = {
    nominal: "bg-wuko-success-fg/15 text-wuko-success-fg",
    degraded: "bg-wuko-warning-fg/15 text-wuko-warning-fg",
    critical: "bg-wuko-danger-fg/15 text-wuko-danger-fg",
  };

  const dotColors = {
    nominal: "bg-wuko-success-fg",
    degraded: "bg-wuko-warning-fg",
    critical: "bg-wuko-danger-fg",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${colors[status]}`}
    >
      <span className={`size-1.5 rounded-full ${dotColors[status]}`} />
      {label}
    </div>
  );
}