import { Device } from "@/types/devices";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL;

export async function getDevices(): Promise<Device[]> {
  const res = await fetch(`${BFF_URL}/devices`);
  if (!res.ok) throw new Error("Failed to fetch devices");
  return res.json();
}