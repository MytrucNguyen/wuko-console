import { Bell } from "lucide-react";

import { EmptyState } from "../_components/empty-state";

export default function AlertsPage() {
  return (
    <EmptyState
      icon={Bell}
      title="Alerts"
      description="Notifications about kiosk health, firmware updates, and device anomalies will appear here."
    />
  );
}