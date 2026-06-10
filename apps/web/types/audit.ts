export type AuditEvent = {
  event_id: string;
  timestamp: string;
  actor: string;
  actor_role: "admin" | "operator" | "viewer";
  action: string;
  target: string;
  region: string;
  outcome: "success" | "failed";
  before?: string;
  after?: string;
};