import { AuditEvent } from "@/types/audit";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function getAuditLog(): Promise<AuditEvent[]> {
  const res = await fetch(`${BFF_URL}/audit-log`);
  if (!res.ok) throw new Error("Failed to fetch audit log");
  return res.json();
}