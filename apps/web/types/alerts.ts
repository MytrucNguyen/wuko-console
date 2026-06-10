export type Alert = {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  device_id: string;
  region: string;
  created_at: string;
  status: "active" | "acknowledged" | "dismissed";
};