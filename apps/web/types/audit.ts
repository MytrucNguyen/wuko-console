export type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  region: string;
  outcome: "success" | "failed";
};