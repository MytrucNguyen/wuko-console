import { Alert } from "@/types/alerts";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function getAlerts(): Promise<Alert[]> {
  const res = await fetch(`${BFF_URL}/alerts`);
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return res.json();
}

export async function acknowledgeAlert(alertId: string): Promise<Alert> {
  const res = await fetch(`${BFF_URL}/alerts/${alertId}/acknowledge`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to acknowledge alert");
  return res.json();
}

export async function dismissAlert(alertId: string): Promise<Alert> {
  const res = await fetch(`${BFF_URL}/alerts/${alertId}/dismiss`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to dismiss alert");
  return res.json();
}