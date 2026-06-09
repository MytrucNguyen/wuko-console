import { Shield, Wrench, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Persona = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
  href: string;
};

export const PERSONAS = [
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    description:
      "All regions • restart & update devices • view audit log • manage policies",
    badge: "full access",
    href: "/fleet?persona=admin",
  },
  {
    id: "operator",
    name: "Operator",
    icon: Wrench,
    description:
      "Assigned region only • restart & update devices • acknowledge alerts",
    badge: undefined,
    href: "/fleet?persona=operator",
  },
  {
    id: "viewer",
    name: "Viewer",
    icon: Eye,
    description: "Assigned region only • read-only • cannot take any actions",
    badge: undefined,
    href: "/fleet?persona=viewer",
  },
] as const satisfies readonly Persona[];
